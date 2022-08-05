import { AuthorizationCode } from "../../../entities/AuthorizationCode";
import { IAuthorizationCodeRepository } from "../../IAuthorizationCodeRepository";
import { PostgresDatabase } from "./index";

export class PostgresAuthorizationCodeRepository implements IAuthorizationCodeRepository {
  constructor(private postgresDatabase: PostgresDatabase) { }

  async create(authorizationCode: AuthorizationCode): Promise<AuthorizationCode> {
    const created = await this.postgresDatabase.client.query(`INSERT INTO authorization_code 
        (code, expires_at, redirect_uri, client_id, user_id) 
        VALUES (?, ?, ?, ?, ?)`,
      authorizationCode.getCode(),
      authorizationCode.getExpiresAt().toISOString(),
      authorizationCode.getRedirectUri(),
      authorizationCode.getClientId(),
      authorizationCode.getUserId()
    )
    authorizationCode.setId(created.lastID)
    return authorizationCode
  }
  async getByCode(code: string): Promise<AuthorizationCode> {
    const authorizationCodeFound = await this.postgresDatabase.client.get(`SELECT 
          code, expires_at, redirect_uri, client_id, user_id, active, id
      FROM authorization_code
      WHERE code = ?`,
      code
    )
    if (!authorizationCodeFound) throw { code: "RS-IS-SE-AC-001", message: "Authorization code not found" }

    const authorizationCode = new AuthorizationCode(
      authorizationCodeFound.code,
      new Date(authorizationCodeFound.expires_at),
      authorizationCodeFound.redirect_uri,
      authorizationCodeFound.client_id,
      authorizationCodeFound.user_id,
      authorizationCodeFound.active === 1 ? true : false,
      authorizationCodeFound.id
    )
    return authorizationCode
  }
  async disable(code: string): Promise<void> {
    const updated = await this.postgresDatabase.client.query(
      'UPDATE authorization_code SET active = ? WHERE code = ?',
      0,
      code
    )
    if (updated.changes !== 1) throw { code: "RS-IS-SE-AC-002", message: "Failed to disable authorization code" }
  }
}
