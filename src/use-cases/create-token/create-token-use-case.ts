import {IAuthorizationCodeRepository} from "../../repositories/IAuthorizationCodeRepository";
import {ITokenRepository} from "../../repositories/ITokenRepository";
import {IClientRepository} from "../../repositories/IClientRepository";
import {CreateTokenRequestDTO} from "./create-token-DTO";
import {CreateTokenResponseDTO} from "./create-token-response-DTO";
import {IToken} from "../../interfaces/IToken";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {DateHelper} from "../../helpers/implementations/DateHelper";

export class CreateTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private authorizeCodeRepository: IAuthorizationCodeRepository,
    private clientRepository: IClientRepository,
    private cryptoHelper: CryptoHelper,
    private dateHelper: DateHelper,
  ) {}

  async execute(data: CreateTokenRequestDTO): Promise<CreateTokenResponseDTO> {
    const {
      client_id,
      client_secret,
      code,
    } = data

    const clientFound = await this.clientRepository.getById(client_id)
    if (!clientFound) throw {code: "UC-CT-001", message: "Client not found"}
    if (clientFound.clientSecret !== client_secret) throw {code: "UC-CT-002", message: "Invalid Client secret"}
    const authorizationCodeFound = await this.authorizeCodeRepository.getByCode(code)
    if (!authorizationCodeFound) throw {code: "UC-CT-003", message: "Authorization Code not found"}
    const token: IToken = {
      accessToken: this.cryptoHelper.generateRandomHash(),
      accessTokenExpiresAt: this.dateHelper.nowPlusSeconds(3600),
      refreshToken: this.cryptoHelper.generateRandomHash(),
      refreshTokenExpiresAt: this.dateHelper.nowPlusSeconds(604800),
      client: clientFound,
      user: authorizationCodeFound.user,
    }
    const tokenCreated = await this.tokenRepository.create(token)
    if (!tokenCreated) throw {code: "UC-CT-004", message: "Failed to create Token"}

    const disabledAuthorizationCode = await this.authorizeCodeRepository.disable(authorizationCodeFound.authorizationCode)
    if (!disabledAuthorizationCode) throw {code: "UC-CT-005", message: "Failed to disable authorization code"} //TODO: revoke token

    const tokenResponse: CreateTokenResponseDTO = {
      token_type: 'Bearer',
      access_token: tokenCreated.accessToken,
      expires_in: 3600,
    }
    return tokenResponse
  }
}
