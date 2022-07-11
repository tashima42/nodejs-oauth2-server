import { IDateHelper } from "../../helpers/IDateHelper";
import { ITokenRepository } from "../../repositories/ITokenRepository"
import { User } from "../../entities/User"
import { Token } from "../../entities/Token";

export class AuthorizeUserUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private dateHelper: IDateHelper,
  ) { }

  async execute(accessToken: string): Promise<User> {
    let user: User, token: Token
    try {
      const { user: userFound, token: tokenFound } = await this.tokenRepository.getByAccessTokenWithUser(accessToken);
      user = userFound
      token = tokenFound
    } catch (error) {
      if (error.code === "RS-IS-SE-TN-001") throw { code: "UC-AU-001", message: "Invalid access token" };
      throw error
    }

    if (token.getActive() === false) throw { code: "UC-AU-002", message: "Token is not active" }
    const isTokenExpirationDateLessThanNow = this.dateHelper.isDateLessThanNow(token.getAccessTokenExpiresAt())

    console.log({
      now: new Date(),
      nowPlusSeconds: this.dateHelper.nowPlusSeconds(8640),
      tokenExpiresAt: token.getAccessTokenExpiresAt(),
      isTokenExpirationDateLessThanNow,
      active: token.getActive()
    })
    if (isTokenExpirationDateLessThanNow) throw { code: "UC-AU-003", message: "Token is expired" }
    return user;
  }
}
