import {IUserRepository} from "../../repositories/IUserRepository";
import {IAuthorizationCodeRepository} from "../../repositories/IAuthorizationCodeRepository";
import {IClientRepository} from "../../repositories/IClientRepository";
import {ICryptoHelper} from "../../helpers/ICryptoHelper";
import {ILoginUserRequestDTO} from "./login-user-request-DTO";
import {IDateHelper} from "../../helpers/IDateHelper";
import {authorizationCodeDuration} from "../../constants"
import {AuthorizationCode} from "../../entities/AuthorizationCode"

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private clientRepository: IClientRepository,
    private authorizationCodeRepository: IAuthorizationCodeRepository,
    private cryptoHelper: ICryptoHelper,
    private dateHelper: IDateHelper,
  ) {}

  async execute(data: ILoginUserRequestDTO): Promise<string> {
    const {
      username,
      password: plainPassword,
      redirect_uri,
      client_id,
      country,
    } = data

    // Get user information
    const userFound = await this.userRepository.findByUsernameAndCountry(username, country)
    if (!userFound.getPassword()) throw {code: "UC-AU-001", message: "User not found"}
    // Extract hashed password from user
    const hashedPassword = userFound.getPassword()
    // Compare plain password with hashed password
    const isPasswordCorrect = await this.cryptoHelper.compareBcrypt(plainPassword, hashedPassword)
    if (!isPasswordCorrect) throw {code: "UC-AU-002", message: "Incorrect password"}
    // Get client information
    const client = await this.clientRepository.getByClientId(client_id)
    if (!client) throw {code: "UC-AU-003", message: "Client not found"}
    if (!client.getRedirectUris().find(uri => uri === redirect_uri)) throw {code: "UC-AU-004", message: "Redirect URI not registered in the client"}
    // Generate authorization code for the user
    const authorizationCode = await this.generateAuthorizationCode(redirect_uri, userFound.getId(), client.getId() )
    return authorizationCode
  }

  private async generateAuthorizationCode(redirectUri: string, clientId: number, userId: number): Promise<string> {
    const authorizationCode = new AuthorizationCode(
      this.cryptoHelper.generateRandomHash(),
      this.dateHelper.nowPlusSeconds(authorizationCodeDuration),
      redirectUri,
      clientId,
      userId
    )
    // Create authorization code
    const createdAuthorizationCode = await this.authorizationCodeRepository.create(authorizationCode)
    // Get code string
    const code = createdAuthorizationCode.getCode()
    if (!code) throw {code: "UC-AU-005", message: "Failed to create code"}
    return code
  }
}
