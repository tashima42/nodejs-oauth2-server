import {ITokenRepository} from "../../ITokenRepository";
import {IToken} from "../../../interfaces/IToken";
import {SqliteDatabase} from "./index";
import {IUser} from "../../../interfaces/IUser";
import {IClient} from "../../../interfaces/IClient";

export class SqliteTokenRepository implements ITokenRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}
  async create(token: IToken): Promise<IToken> {
    const db = await this.sqliteDatabase.open()
    const created = await db.run(`INSERT INTO token (
        access_token, 
        access_token_expires_at, 
        refresh_token, 
        refresh_token_expires_at, 
        client_id,
        user_id
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      token.accessToken,
      token.accessTokenExpiresAt,
      token.refreshToken,
      token.refreshTokenExpiresAt,
      token.client.clientId,
      token.user.username,
    )
    token.id = created.lastId
    return token
  }
  async getByAccessToken(accessToken: string): Promise<IToken> {
    const db = await this.sqliteDatabase.open()
    const tokenFound = await db.get(`SELECT * FROM token
      LEFT JOIN client ON token.client_id = client.client_id
      LEFT JOIN user ON token.user_id = user.username
      WHERE access_token = ?;`,
      accessToken
    )
    if (!tokenFound) throw {code: "RS-IS-SE-TN-001", message: "Token not found"}

    //TODO: create generic function
    const client: IClient = {
      clientId: tokenFound.client_id,
      clientSecret: tokenFound.client_secret,
      redirectUris: tokenFound.redirect_uris.split("|%s|"),
    }
    const user: IUser = {
      username: tokenFound.username,
      password: tokenFound.password,
      packages: tokenFound.packages.split("|%s|"),
      country: tokenFound.country,
      subscriberId: tokenFound.subscriber_id
    }
    const token: IToken = {
      accessToken: tokenFound.access_token,
      accessTokenExpiresAt: tokenFound.access_token_expires_at,
      refreshToken: tokenFound.refresh_token,
      refreshTokenExpiresAt: tokenFound.refresh_token_expires_at,
      client,
      user,
      id: tokenFound.id,
    }

    return token
  }
}
