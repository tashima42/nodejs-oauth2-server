import {ITokenRepository} from "../../repositories/ITokenRepository";
import {IClientRepository} from "../../repositories/IClientRepository";
import {RefreshTokenRequestDTO} from "./refresh-token-request-DTO";
import {RefreshTokenResponseDTO} from "./refresh-token-response-DTO";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {Token} from "../../entities/Token"
import {accessTokenDuration} from "../../constants"

export class RefreshTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private clientRepository: IClientRepository,
    private cryptoHelper: CryptoHelper,
    private dateHelper: DateHelper,
  ) {}

  async execute(data: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    const {client_id, client_secret, refresh_token} = data

    const clientFound = await this.clientRepository.getByClientId(client_id)
    if (!clientFound) throw {code: "UC-RT-001", message: "Client not found"}
    const isClientSecretCorrect = await this.cryptoHelper.compareBcrypt(client_secret, clientFound.getClientSecret())
    if (!isClientSecretCorrect) throw {code: "UC-RT-006", message: "Incorrect Client secret"}

    const tokenFound = await this.tokenRepository.getByRefreshToken(refresh_token)
    if(!tokenFound) throw {code: "UC-RT-002", message: "Refresh token not found"}

    const token = new Token(
      this.cryptoHelper.generateRandomHash(),
      this.dateHelper.nowPlusSeconds(accessTokenDuration),
      this.cryptoHelper.generateRandomHash(),
      clientFound.getId(),
      tokenFound.getUserId(),
    )
    // Insert token in the database
    const tokenCreated = await this.tokenRepository.create(token)
    if (!tokenCreated) throw {code: "UC-RT-004", message: "Failed to create Token"}

    await this.tokenRepository.disable(tokenFound.getAccessToken())

    const tokenResponse: RefreshTokenResponseDTO = {
      token_type: 'Bearer',
      access_token: tokenCreated.getAccessToken(),
      expires_in: accessTokenDuration,
      refresh_token: tokenCreated.getRefreshToken(),
    }
    return tokenResponse
  }
}
