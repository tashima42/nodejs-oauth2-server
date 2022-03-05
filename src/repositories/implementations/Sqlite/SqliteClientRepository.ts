import {IClientRepository} from "../../IClientRepository";
import {IClient} from "../../../interfaces/IClient";
import {SqliteDatabase} from "./index";

export class SqliteClientRepository implements IClientRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async getById(id: string): Promise<IClient> {
    const db = await this.sqliteDatabase.open()
    const clientFound = await db.get(`SELECT * FROM client
      WHERE client_id = ?;`,
      id,
    )
    if (!clientFound) throw {code: "RS-IS-SE-CT-001", message: "Client not found"}
    const client: IClient = {
      clientId: clientFound.client_id,
      clientSecret: clientFound.client_secret,
      id: clientFound.id,
    }
    client.redirectUris = clientFound.redirect_uris ? clientFound.redirect_uris.split("|%s|") : null
    client.grants = clientFound.grants ? clientFound.grants.split("|%s|") : null
    client.apiKey = clientFound.apiKey ? clientFound.apiKey : null
    return client
  }
}
