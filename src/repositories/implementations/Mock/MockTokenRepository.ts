import {ITokenRepository} from "../../ITokenRepository";
import {IToken} from "../../../interfaces/IToken";

export class MockTokenRepository implements ITokenRepository {
  async create(token: IToken): Promise<IToken> {
    token._id = "token1"
    return new Promise(resolve => resolve(token))
  }
}
