import {IAuthorizationCode} from "../../../interfaces/IAuthorizationCode";
import {IClient} from "../../../interfaces/IClient";
import {IUser} from "../../../interfaces/IUser";
import {IAuthorizationCodeRepository} from "../../IAuthorizationCodeRepository";
import {SqliteDatabase} from "./index";

export class SqliteAuthorizationCodeRepository implements IAuthorizationCodeRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(authorizationCode: IAuthorizationCode): Promise<IAuthorizationCode> {
    const db = await this.sqliteDatabase.open()
    const created = await db.run(`INSERT INTO authorization_code 
        (code, expires_at, redirect_uri, client_id, user_id) 
        VALUES (?, ?, ?, ?, ?)`,
      authorizationCode.authorizationCode,
      authorizationCode.expiresAt,
      authorizationCode.redirectUri,
      authorizationCode.client.clientId,
      authorizationCode.user.username
    )
    authorizationCode.id = created.lastId
    return authorizationCode
  }
  async getByCode(code: string): Promise<IAuthorizationCode> {
    const db = await this.sqliteDatabase.open()
    const authorizationCodeFound = await db.get(`SELECT * FROM authorization_code
      LEFT JOIN client ON authorization_code.client_id = client.client_id
      LEFT JOIN user ON authorization_code.user_id = user.username
      WHERE code = ? AND active = 1;`,
      code
    )
    if (!authorizationCodeFound) throw {code: "RS-IS-SE-AC-001", message: "Authorization code not found"}
    const client: IClient = {
      clientId: authorizationCodeFound.client_id,
      clientSecret: authorizationCodeFound.client_secret,
      redirectUris: authorizationCodeFound.redirect_uris.split("|%s|"),
    }
    const user: IUser = {
      username: authorizationCodeFound.username,
      password: authorizationCodeFound.password,
      packages: authorizationCodeFound.packages.split("|%s|"),
      country: authorizationCodeFound.country,
      subscriberId: authorizationCodeFound.subscriber_id
    }
    const authorizationCode: IAuthorizationCode = {
      authorizationCode: authorizationCodeFound.code,
      expiresAt: authorizationCodeFound.expires_at,
      redirectUri: authorizationCodeFound.redirect_uri,
      client,
      user
    }
    return authorizationCode
  }
  async disable(code: string): Promise<Boolean> {
    const db = await this.sqliteDatabase.open()
    const updated = await db.run(
      'UPDATE authorization_code SET active = ? WHERE code = ?',
      0,
      code
    )
    if (updated.changes !== 1) throw {code: "RS-IS-SE-AC-002", message: "Failed to disable authorization code"}
    return true
  }
}
