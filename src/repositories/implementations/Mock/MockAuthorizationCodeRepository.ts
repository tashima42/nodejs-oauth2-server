import {ICryptoHelper} from "../../../helpers/ICryptoHelper";
import {IAuthorizationCode} from "../../../interfaces/IAuthorizationCode";
import {IClient} from "../../../interfaces/IClient";
import {IUser} from "../../../interfaces/IUser";
import {IAuthorizationCodeRepository} from "../../IAuthorizationCodeRepository";

export class MockAuthorizationCodeRepository implements IAuthorizationCodeRepository {
  constructor(private cryptoHelper: ICryptoHelper) {}

  async create(authorizationCode: IAuthorizationCode): Promise<IAuthorizationCode> {
    const _id = this.cryptoHelper.generateRandomHash()
    authorizationCode._id = _id
    return authorizationCode
  }
  async getByCode(code: string): Promise<IAuthorizationCode> {
    const mockClient: IClient = {
      _id: "28riosndjfh290qhqwhhnioasowe",
      clientId: "client1",
      clientSecret: "secret",
      redirectUris: [
        "https://sp-cert.tbxnet.com/v2/auth/oauth2/assert",
        "https://sp-dev.tbxnet.com/v2/auth/oauth2/assert",
      ],
    }
    const mockUser: IUser = {
      _id: "q289yruiasdf9ih23yui9fwequifqwe",
      username: "user1@example.com",
      password: "$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO", // secret
      packages: ["urn:tve:tbx"],
      country: "AR",
      subscriberId: "subscriber1",
    }
    const authorizationCode: IAuthorizationCode = {
      authorizationCode: "authcode1",
      expiresAt: new Date(),
      redirectUri: "https://example.com",
      client: mockClient,
      user: mockUser,
    }
    return new Promise(resolve => resolve(authorizationCode))
  }
  async disable(code: string): Promise<Boolean> {
    return new Promise(resolve => resolve(true))
  }
}
