import {IToken} from "../interfaces/IToken";

export interface ITokenRepository {
  create(token: IToken): Promise<IToken>,
  getByAccessToken(accessToken: string): Promise<IToken>,
}
