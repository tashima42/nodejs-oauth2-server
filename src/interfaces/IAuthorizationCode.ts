import {IClient} from "./IClient";
import {IUser} from "./IUser";

export interface IAuthorizationCode {
  authorizationCode: string,
  expiresAt: Date,
  redirectUri: string,
  client: IClient,
  user: IUser,
  id?: string,
}
