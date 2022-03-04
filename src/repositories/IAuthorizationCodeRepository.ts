import {IAuthorizationCode} from "../interfaces/IAuthorizationCode";
export interface IAuthorizationCodeRepository {
  create(authorizationCode: IAuthorizationCode): Promise<IAuthorizationCode>,
}
