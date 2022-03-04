import {IUserRepository} from "../../repositories/IUserRepository";
import {IAuthorizationCodeRepository} from "../../repositories/IAuthorizationCodeRepository";
import {IClientRepository} from "../../repositories/IClientRepository";
import {ICryptoHelper} from "../../helpers/ICryptoHelper";
import {IUser} from "../../interfaces/IUser";
import {IClient} from "../../interfaces/IClient";
import {IAuthorizeUserRequestDTO} from "./authorize-user-DTO";
import {IDateHelper} from "../../helpers/IDateHelper";

export class AuthorizeUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private clientRepository: IClientRepository,
    private authorizationCodeRepository: IAuthorizationCodeRepository,
    private cryptoHelper: ICryptoHelper,
    private dateHelper: IDateHelper,
  ) {}

  async execute(data: IAuthorizeUserRequestDTO): Promise<string> {
    const {
      username,
      password: plainPassword,
      redirect_uri,
      client_id,
      country,
    } = data

    const userFound = await this.userRepository.findByUsernameAndCountry(username, country)
    if (!userFound?.password) throw {code: "UC-AU-001", message: "User not found"}

    const {password: hashedPassword} = userFound

    const isPasswordCorrect = await this.cryptoHelper.compareBcrypt(plainPassword, hashedPassword)
    if (!isPasswordCorrect) throw {code: "UC-AU-002", message: "Incorrect password"}

    const client = await this.clientRepository.getById(client_id)
    //TODO: add error checks

    const authorizationCode = await this.generateAuthorizationCode(userFound, client, redirect_uri)

    return authorizationCode
  }

  private async generateAuthorizationCode(user: IUser, client: IClient, redirectUri: string): Promise<string> {
    const authorizationCode = {
      authorizationCode: this.cryptoHelper.generateRandomHash(),
      expiresAt: this.dateHelper.nowPlusSeconds(60),
      redirectUri,
      client,
      user,
    }
    const createdAuthorizationCode = await this.authorizationCodeRepository.create(authorizationCode)
    const code = createdAuthorizationCode.authorizationCode
    //TODO: error checks
    return code
  }
}
