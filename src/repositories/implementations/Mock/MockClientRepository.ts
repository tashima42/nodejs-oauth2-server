import {IClientRepository} from "../../IClientRepository";
import {IClient} from "../../../interfaces/IClient";

export class MockClientRepository implements IClientRepository {
  async getById(id: string): Promise<IClient> {
    const mockData = [{
      id: "28riosndjfh290qhqwhhnioasowe",
      clientId: "client1",
      clientSecret: "secret",
      redirectUris: [
        "https://sp-cert.tbxnet.com/v2/auth/oauth2/assert",
        "https://sp-dev.tbxnet.com/v2/auth/oauth2/assert",
      ],
    }]

    const client = mockData.find(record => record.clientId === id)
    return client
  }
}
