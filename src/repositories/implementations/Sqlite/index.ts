import sqlite3 from "sqlite3"
import {open} from "../../../../node_modules/sqlite/build/index"
import path from "path"

const databasePath = path.join(__dirname, '../../../../database.db')

export class SqliteDatabase {
  async open(): Promise<any> {
    const db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    db.on('trace', (data: any) => console.log(data))
    return db
  }

  async migrate(db: any): Promise<void> {
    await createTableClient(db)
    await createTableUser(db)
    await createTableToken(db)
    await createTableAuthorizationCode(db)

    async function createTableClient(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS client(
      id 'INTEGER' PRIMARY KEY,
      client_id 'TEXT' NOT NULL UNIQUE,
      client_secret 'TEXT' NOT NULL UNIQUE,
      redirect_uris 'TEXT',
      grants 'TEXT',
      api_key 'TEXT' UNIQUE
    )`)
    }
    async function createTableUser(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS user(
      id 'INTEGER' PRIMARY KEY,
      username 'TEXT' NOT NULL UNIQUE,
      password 'TEXT' NOT NULL UNIQUE,
      packages 'TEXT' NOT NULL,
      country 'TEXT' NOT NULL,
      subscriber_id 'TEXT' NOT NULL UNIQUE
    )`)
    }
    async function createTableToken(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS token(
      id 'INTEGER' PRIMARY KEY,
      access_token 'TEXT' NOT NULL UNIQUE,
      access_token_expires_at 'TEXT' NOT NULL,
      refresh_token 'TEXT' NOT NULL UNIQUE,
      refresh_token_expires_at 'TEXT' NOT NULL,
      client_id 'TEXT' NOT NULL,
      user_id 'TEXT' NOT NULL,
      FOREIGN KEY (client_id) REFERENCES client (client_id),
      FOREIGN KEY (user_id) REFERENCES user (username)
    )`)
    }
    async function createTableAuthorizationCode(db: any): Promise<void> {
      await db.exec(`CREATE TABLE IF NOT EXISTS authorization_code(
      id 'INTEGER' PRIMARY KEY,
      code 'TEXT' NOT NULL UNIQUE,
      expires_at 'TEXT' NOT NULL,
      redirect_uri 'TEXT' NOT NULL,
      client_id 'INTEGER' NOT NULL,
      user_id 'TEXT' NOT NULL,
      active 'BOOLEAN' NOT NULL DEFAULT true,
      FOREIGN KEY (client_id) REFERENCES client (client_id),
      FOREIGN KEY (user_id) REFERENCES user (username)
    )`)
    }
  }

  async populate(db: any): Promise<void> {
    await populateClient(db)
    await populateUser(db)
    await populateToken(db)
    await populateAuthoriztionCode(db)

    async function populateClient(db: any) {
      await db.run(`INSERT INTO client (
        client_id, client_secret, redirect_uris
      ) VALUES (?, ?, ?) `,
        'client1',
        'secret',
        'https://sp-cert.tbxnet.com/v2/auth/oauth2/assert|%s|https://sp-dev.tbxnet.com/v2/auth/oauth2/assert|%s|https://tashima42.github.io/tbx-local-dummy/',
      )
    }
    async function populateUser(db: any) {
      await db.run(`INSERT INTO user (
        username, password, packages, country, subscriber_id
      ) VALUES (?, ?, ?, ?, ?) `,
        'user1@example.com',
        '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
        'urn:tve:tbx|%s|urn:tve:dtv|%s|urn:tve:hbo',
        'AR',
        'subscriber1'
      )
    }
    async function populateToken(db: any) {
      await db.run(`INSERT INTO token (
        access_token, 
        access_token_expires_at, 
        refresh_token, 
        refresh_token_expires_at, 
        client_id,
        user_id
      ) VALUES (?, ?, ?, ?, ?, ?)`,
        'authtoken1',
        'date',
        'refrestoken1',
        'date',
        'client1',
        'user1@example.com'
      )
    }
    async function populateAuthoriztionCode(db: any) {
      await db.run(`INSERT INTO authorization_code (
        code, expires_at, redirect_uri, client_id, user_id
      ) VALUES (?, ?, ?, ?, ?)`,
        'authcode1',
        'date',
        'https://sp-dev.tbxnet.com/v2/auth/oauth2/assert',
        'client1',
        'user1@example.com'
      )
    }
  }
}

