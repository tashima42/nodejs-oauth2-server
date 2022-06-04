import sqlite3 from "sqlite3"
import {open} from "../../../../node_modules/sqlite/build/index"
import path from "path"

const databaseFile = process.env.SQLITE_NAME || "database.dev.db"
const databasePath = path.join(__dirname, `../../../../${databaseFile}`)

export class SqliteDatabase {
  db: any;

  async open(): Promise<any> {
    this.db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    this.db.on('trace', (data: any) => console.log(data))
  }

  async migrate(): Promise<void> {
    await this.createTableClient()
    await this.createTableUser()
    await this.createTableToken()
    await this.createTableAuthorizationCode()
  }
  async populate(): Promise<void> {
    await this.populateClient()
    await this.populateUser()
    await this.populateToken()
    await this.populateAuthorizationCode()
  }
  async dropAll(): Promise<void> {
    await this.dropTableAuthorizationCode()
    await this.dropTableToken()
    await this.dropTableClient()
    await this.dropTableUser()
  }

  private async createTableClient(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS client(
      id 'INTEGER' PRIMARY KEY,
      client_id 'TEXT' NOT NULL UNIQUE,
      client_secret 'TEXT' NOT NULL,
      redirect_uris 'TEXT',
      grants 'TEXT'
    )`)
  }
  private async  createTableUser(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS user(
      id 'INTEGER' PRIMARY KEY,
      username 'TEXT' NOT NULL UNIQUE,
      password 'TEXT' NOT NULL UNIQUE,
      country 'TEXT' NOT NULL,
      subscriber_id 'TEXT' NOT NULL UNIQUE
    )`)
  }
  private async  createTableToken(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS token(
      id 'INTEGER' PRIMARY KEY,
      access_token 'TEXT' NOT NULL UNIQUE,
      access_token_expires_at 'TEXT' NOT NULL,
      refresh_token 'TEXT' NOT NULL UNIQUE,
      client_id 'INTEGER' NOT NULL,
      user_id 'INTEGER' NOT NULL,
      active 'BOOLEAN' NOT NULL DEFAULT true,
      FOREIGN KEY (client_id) REFERENCES client (id),
      FOREIGN KEY (user_id) REFERENCES user (id)
    )`)
  }
  private async  createTableAuthorizationCode(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS authorization_code(
      id 'INTEGER' PRIMARY KEY,
      code 'TEXT' NOT NULL UNIQUE,
      expires_at 'TEXT' NOT NULL,
      redirect_uri 'TEXT' NOT NULL,
      client_id 'INTEGER' NOT NULL,
      user_id 'TEXT' NOT NULL,
      active 'BOOLEAN' NOT NULL DEFAULT true,
      FOREIGN KEY (client_id) REFERENCES client (id),
      FOREIGN KEY (user_id) REFERENCES user (id)
    )`)
  }

  private async  populateClient() {
    await this.db.run(`INSERT INTO client (
      client_id, client_secret, redirect_uris
    ) VALUES (?, ?, ?) `,
      'client1',
      '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
      'https://sp-cert.tbxnet.com/v2/auth/oauth2/assert|%s|https://sp-dev.tbxnet.com/v2/auth/oauth2/assert|%s|https://tashima42.github.io/tbx-local-dummy',
    )
  }
  private async  populateUser() {
    await this.db.run(`INSERT INTO user (
      username, password, country, subscriber_id
    ) VALUES (?, ?, ?, ?) `,
      'user1@example.com',
      '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
      'AR',
      'subscriber1'
    )
  }
  private async  populateToken() {
    await this.db.run(`INSERT INTO token (
      access_token, 
      access_token_expires_at, 
      refresh_token, 
      client_id,
      user_id
    ) VALUES (?, ?, ?, ?, ?)`,
      'authtoken1',
      '2022-06-04T14:23:06+0000',
      'refrestoken1',
      1,
      1
    )
  }
  private async  populateAuthorizationCode() {
    await this.db.run(`INSERT INTO authorization_code (
      code, expires_at, redirect_uri, client_id, user_id
    ) VALUES (?, ?, ?, ?, ?)`,
      'authcode1',
      'date',
      'https://tashima42.github.io/tbx-local-dummy',
      1,
      1
    )
  }
  private async dropTableAuthorizationCode(): Promise<void> {
      await this.db.run(`DROP TABLE authorization_code;`)
  }
  private async dropTableToken(): Promise<void> {
      await this.db.run(`DROP TABLE token;`)
  }
  private async dropTableClient(): Promise<void> {
      await this.db.run(`DROP TABLE client;`)
  }
  private async dropTableUser(): Promise<void> {
      await this.db.run(`DROP TABLE user;`)
  }
}

