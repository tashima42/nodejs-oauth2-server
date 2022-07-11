import { IClientRepository } from "../../IClientRepository";
import { Client } from "../../../entities/Client";
import { SqliteDatabase } from "./index";

export class SqliteClientRepository implements IClientRepository {
  constructor(private sqliteDatabase: SqliteDatabase) { }

  async getByClientId(client_id: string): Promise<Client> {
    const clientFound = await this.sqliteDatabase.db.get(`SELECT 
            client_id, client_secret, redirect_uris, grants, id
      FROM client
      WHERE client_id = ?;`,
      client_id,
    )
    if (!clientFound) throw { code: "RS-IS-SE-CT-001", message: "Client not found" }
    const client = new Client(
      clientFound.client_id,
      clientFound.client_secret,
      clientFound.redirect_uris ? clientFound.redirect_uris.split("|%s|") : undefined,
      clientFound.grants ? clientFound.grants.split("|%s|") : undefined,
      clientFound.id,
    )
    return client
  }
}
