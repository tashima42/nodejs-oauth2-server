import {IClient} from "./IClient";
import {IUser} from "./IUser";

export interface IToken {
  accessToken: string,
  accessTokenExpiresAt: Date,
  refreshToken: string,
  refreshTokenExpiresAt: string,
  client: IClient,
  user: IUser,
  _id?: string,
}
