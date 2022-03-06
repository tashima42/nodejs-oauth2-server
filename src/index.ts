import express, {Request, NextFunction, Response} from "express"
import cors from "cors"

import {router} from "./routes"

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(log)
app.use(router)

app.listen(3890, () => console.info("app listening on port 3890"))

function log(req: Request, res: Response, next: NextFunction): unknown {
  console.log({
    query: req.query,
    body: req.body,
    url: req.url,
  })
  return next()
}
