import { Client } from "pg"

export class PostgresDatabase {
  client: any;

  constructor() {
    this.client = new Client()
  }

  async open(): Promise<void> {
    await this.client.connect()
  }

  async close(): Promise<void> {
    await this.client.close()
  }

  async migrate(): Promise<void> {
    console.log("create table client")
    await this.createTableClient()
    console.log("create table user account")
    await this.createTableUserAccount()
    console.log("create table token")
    await this.createTableToken()
    console.log("create table authorization code")
    await this.createTableAuthorizationCode()
  }
  async populate(): Promise<void> {
    await this.populateClient()
    await this.populateUserAccount()
    await this.populateToken()
    await this.populateAuthorizationCode()
  }
  async dropAll(): Promise<void> {
    await this.dropTableAuthorizationCode()
    await this.dropTableToken()
    await this.dropTableClient()
    await this.dropTableUserAccount()
  }

  private async createTableClient(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS client(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      client_id TEXT NOT NULL UNIQUE,
      client_secret TEXT NOT NULL,
      redirect_uris TEXT,
      grants TEXT
    )`)
  }
  private async createTableUserAccount(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS user_account(
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL UNIQUE,
      country TEXT NOT NULL,
      subscriber_id TEXT NOT NULL UNIQUE
    )`)
  }
  private async createTableToken(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS token(
      id SERIAL PRIMARY KEY,
      access_token TEXT NOT NULL UNIQUE,
      access_token_expires_at TEXT NOT NULL,
      refresh_token TEXT NOT NULL UNIQUE,
      client_id SERIAL NOT NULL,
      user_account_id SERIAL NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      FOREIGN KEY (client_id) REFERENCES client (id),
      FOREIGN KEY (user_account_id) REFERENCES user_account (id)
    )`)
  }
  private async createTableAuthorizationCode(): Promise<void> {
    await this.client.query(`CREATE TABLE IF NOT EXISTS authorization_code(
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      redirect_uri TEXT NOT NULL,
      client_id SERIAL NOT NULL,
      user_account_id SERIAL NOT NULL,
      active BOOLEAN NOT NULL DEFAULT true,
      FOREIGN KEY (client_id) REFERENCES client (id),
      FOREIGN KEY (user_account_id) REFERENCES user_account (id)
    )`)
  }

  private async populateClient() {
    await this.client.query({
      text: `INSERT INTO client ( name, client_id, client_secret, redirect_uris) VALUES ($1, $2, $3, $4);`,
      values: [
        'client name',
        'client1',
        'secret',
        'https://sp-cert.tbxnet.com/v2/auth/oauth2/assert|%s|https://sp-dev.tbxnet.com/v2/auth/oauth2/assert|%s|https://tashima42.github.io/tbx-local-dummy',
      ]
    })
  }
  private async populateUserAccount() {
    await this.client.query({
      text: `INSERT INTO user_account ( username, password, country, subscriber_id) VALUES ($1, $2, $3, $4);`,
      values: [
        'user1@example.com',
        '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
        'AR',
        'subscriber1'
      ]
    })
  }
  private async populateToken() {
    await this.client.query({
      text: `INSERT INTO token ( access_token, access_token_expires_at, refresh_token, client_id, user_account_id) VALUES ($1, $2, $3, $4, $5);`,
      values: [
        'authtoken1',
        '2022-06-04T14:23:06+0000',
        'refrestoken1',
        1,
        1
      ]
    })
  }
  private async populateAuthorizationCode() {
    await this.client.query({
      text: `INSERT INTO authorization_code ( code, expires_at, redirect_uri, client_id, user_account_id) VALUES ($1, $2, $3, $4, $5);`,
      values: [
        'authcode1',
        'date',
        'https://tashima42.github.io/tbx-local-dummy',
        1,
        1
      ]
    })
  }
  private async dropTableAuthorizationCode(): Promise<void> {
    await this.client.query(`DROP TABLE authorization_code;`)
  }
  private async dropTableToken(): Promise<void> {
    await this.client.query(`DROP TABLE token;`)
  }
  private async dropTableClient(): Promise<void> {
    await this.client.query(`DROP TABLE client;`)
  }
  private async dropTableUserAccount(): Promise<void> {
    await this.client.query(`DROP TABLE user_account;`)
  }
}

