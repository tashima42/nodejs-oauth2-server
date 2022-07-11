import { SqliteDatabase } from "./repositories/implementations/Sqlite/index"
const sqliteDatabase = new SqliteDatabase()
export { sqliteDatabase }

import express, { Request, NextFunction, Response } from "express"
import cors from "cors"

import { router } from "./routes"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(log)
app.use(router)

function log(req: Request, _: Response, next: NextFunction): void {
  console.log({
    query: req.query,
    body: req.body,
    url: req.url,
  })
  return next()
}

export { app }
