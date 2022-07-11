import { AuthorizationCode } from "../entities/AuthorizationCode";

export interface IAuthorizationCodeRepository {
  create(authorizationCode: AuthorizationCode): Promise<AuthorizationCode>,
  disable(authorizationCode: string): Promise<void>,
  getByCode(authorizationCode: string): Promise<AuthorizationCode>,
}
