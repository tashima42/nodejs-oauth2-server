import { IDateHelper } from "../../helpers/IDateHelper";
import { ITokenRepository } from "../../repositories/ITokenRepository"
import { User } from "../../entities/User"

export class AuthorizeUserUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private dateHelper: IDateHelper,
  ) { }

  async execute(accessToken: string): Promise<User> {
    const { user, token } = await this.tokenRepository.getByAccessTokenWithUser(accessToken);
    if (!token) throw { code: "", message: "Invalid access token" };

    if (token.getActive() === false) throw { code: "", message: "Token is not active" }
    const isTokenExpirationDateLessThanNow = this.dateHelper.isDateLessThanNow(token.getAccessTokenExpiresAt())
    if (isTokenExpirationDateLessThanNow) throw { code: "", message: "Token is expired" }
    return user;
  }
}
