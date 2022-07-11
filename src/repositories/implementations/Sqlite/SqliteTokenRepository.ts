import { ITokenRepository } from "../../ITokenRepository";
import { SqliteDatabase } from "./index";
import { Token } from "../../../entities/Token";
import { User } from "../../../entities/User";

export class SqliteTokenRepository implements ITokenRepository {
  constructor(private sqliteDatabase: SqliteDatabase) { }
  async create(token: Token): Promise<Token> {
    const created = await this.sqliteDatabase.db.run(`INSERT INTO token (
        access_token, 
        access_token_expires_at, 
        refresh_token, 
        client_id,
        user_id
      ) VALUES (?, ?, ?, ?, ?)`,
      token.getAccessToken(),
      token.getAccessTokenExpiresAt().toISOString(),
      token.getRefreshToken(),
      token.getClientId(),
      token.getUserId(),
    )
    token.setId(created.lastID)
    return token
  }
  async getByAccessTokenWithUser(accessToken: string): Promise<{ user: User, token: Token }> {
    const tokenFound = await this.sqliteDatabase.db.get(`SELECT 
        user.username as user_username,
        user.password as user_password,
        user.id as user_id,
        user.country as user_country,
        user.subscriber_id as user_subscriber_id,
        token.access_token,
        token.access_token_expires_at,
        token.refresh_token,
        token.client_id,
        token.user_id,
        token.id
      FROM token
      LEFT JOIN user ON token.user_id = user.id
      WHERE access_token = ?;`,
      accessToken
    )
    if (!tokenFound) throw { code: "RS-IS-SE-TN-001", message: "Token not found" }

    const user = new User(
      tokenFound.user_username,
      tokenFound.user_password,
      tokenFound.user_country,
      tokenFound.user_subscriber_id,
      tokenFound.user_id,
    )
    const token = new Token(
      tokenFound.access_token,
      new Date(tokenFound.access_token_expires_at),
      tokenFound.refresh_token,
      tokenFound.client_id,
      tokenFound.user_id,
      tokenFound.id
    )

    return { user, token }
  }
  async getByRefreshToken(refreshToken: string): Promise<Token> {
    const tokenFound = await this.sqliteDatabase.db.get(`SELECT 
        access_token,
        access_token_expires_at,
        refresh_token,
        client_id,
        user_id,
        id
      FROM token
      WHERE refresh_token = ?;`,
      refreshToken
    )
    if (!tokenFound) throw { code: "RS-IS-SE-TN-002", message: "Token not found" }

    const token = new Token(
      tokenFound.access_token,
      new Date(tokenFound.access_token_expires_at),
      tokenFound.refresh_token,
      tokenFound.client_id,
      tokenFound.user_id,
      tokenFound.id
    )

    return token
  }
  async disable(accessToken: string): Promise<void> {
    const updated = await this.sqliteDatabase.db.run(
      'UPDATE token SET active = ? WHERE access_token = ?',
      0,
      accessToken
    )
    if (updated.changes !== 1) throw { code: "RS-IS-SE-TN-003", message: "Failed to disable token" }
  }
}
