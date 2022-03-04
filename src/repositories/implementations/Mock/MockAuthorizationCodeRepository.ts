import {ICryptoHelper} from "../../../helpers/ICryptoHelper";
import {IAuthorizationCode} from "../../../interfaces/IAuthorizationCode";
import {IAuthorizationCodeRepository} from "../../IAuthorizationCodeRepository";

export class MockAuthorizationCodeRepository implements IAuthorizationCodeRepository {
  constructor(private cryptoHelper: ICryptoHelper) {}

  async create(authorizationCode: IAuthorizationCode): Promise<IAuthorizationCode> {
    const _id = this.cryptoHelper.generateRandomHash()
    authorizationCode._id = _id
    return authorizationCode
  }
}
