import {IAuthorizationCode} from "../interfaces/IAuthorizationCode";
export interface IAuthorizationCodeRepository {
  create(authorizationCode: IAuthorizationCode): Promise<IAuthorizationCode>,
  disable(authorizationCode: string): Promise<Boolean>,
  getByCode(authorizationCode: string): Promise<IAuthorizationCode>,
}
