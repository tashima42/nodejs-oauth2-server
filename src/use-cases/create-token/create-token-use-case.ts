import { IAuthorizationCodeRepository } from "../../repositories/IAuthorizationCodeRepository";
import { ITokenRepository } from "../../repositories/ITokenRepository";
import { IClientRepository } from "../../repositories/IClientRepository";
import { CreateTokenRequestDTO, CreateTokenResponseDTO } from "./create-token-DTO";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { DateHelper } from "../../helpers/implementations/DateHelper";
import { Token } from "../../entities/Token"
import { accessTokenDuration } from "../../constants"

export class CreateTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private authorizeCodeRepository: IAuthorizationCodeRepository,
    private clientRepository: IClientRepository,
    private cryptoHelper: CryptoHelper,
    private dateHelper: DateHelper,
  ) { }

  async execute(data: CreateTokenRequestDTO): Promise<CreateTokenResponseDTO> {
    const { client_id, client_secret, code } = data

    // Get client information
    const clientFound = await this.clientRepository.getByClientId(client_id)
    if (!clientFound) throw { code: "UC-CT-001", message: "Client not found" }
    // Check if client secret matches with what the client sent
    const isClientSecretCorrect = await this.cryptoHelper.compareBcrypt(client_secret, clientFound.getClientSecret())
    if (!isClientSecretCorrect) throw { code: "UC-CT-002", message: "Incorrect Client secret" }
    // Get authorization code
    const authorizationCodeFound = await this.authorizeCodeRepository.getByCode(code)
    if (!authorizationCodeFound) throw { code: "UC-CT-003", message: "Authorization Code not found" }
    console.log({ authorizationCodeFound })
    if (!authorizationCodeFound.getActive()) throw { code: "UC-CT-004", message: "Authorization Code not active" }
    // Create token
    const token = new Token(
      this.cryptoHelper.generateRandomHash(),
      this.dateHelper.nowPlusSeconds(accessTokenDuration),
      this.cryptoHelper.generateRandomHash(),
      clientFound.getId(),
      authorizationCodeFound.getUserId(),
    )
    // Insert token in the database
    const tokenCreated = await this.tokenRepository.create(token)
    if (!tokenCreated) throw { code: "UC-CT-004", message: "Failed to create Token" }
    // Disable the authorization code to prevent multiple sessions being generated from the same login
    await this.authorizeCodeRepository.disable(authorizationCodeFound.getCode())
    //if (!disabledAuthorizationCode) throw {code: "UC-CT-005", message: "Failed to disable authorization code"} //TODO: revoke token

    const tokenResponse: CreateTokenResponseDTO = {
      token_type: 'Bearer',
      access_token: tokenCreated.getAccessToken(),
      expires_in: accessTokenDuration,
      refresh_token: tokenCreated.getRefreshToken(),
    }
    return tokenResponse
  }
}
