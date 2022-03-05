import {SqliteDatabase} from "../src/repositories/implementations/Sqlite/index"

run()

async function run() {
  const args: Array<string> = process.argv
  console.log(args)

  const sqliteDatabase = new SqliteDatabase()
  const db = await sqliteDatabase.open()
  console.log(db)
  for (const arg of args) {
    if (arg === '--migrate') await sqliteDatabase.migrate(db)
    if (arg === '--populate') await sqliteDatabase.populate(db)
  }
}


