import "dotenv/config"
//import { SqliteDatabase } from "../src/repositories/implementations/Sqlite/index"
import { PostgresDatabase } from "../src/repositories/implementations/Postgres/index"

run()

async function run() {
  let args: Array<string> = process.argv
  args = args.slice(2)
  console.log(args)

  const db = process.env.DB_TYPE
  /*
  if (db === "sqlite") {
    const sqliteDatabase = new SqliteDatabase()
    await sqliteDatabase.open()
    if (args.includes('--drop-all')) await sqliteDatabase.dropAll()
    if (args.includes('--migrate')) await sqliteDatabase.migrate()
    if (args.includes('--populate')) await sqliteDatabase.populate()
  } else */if (db === "postgres") {
    const postgresDatabase = new PostgresDatabase()
    await postgresDatabase.open()
    if (args.includes('--drop-all')) await postgresDatabase.dropAll()
    if (args.includes('--migrate')) await postgresDatabase.migrate()
    if (args.includes('--populate')) await postgresDatabase.populate()
  }
}

