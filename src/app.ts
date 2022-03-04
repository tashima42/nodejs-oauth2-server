import express from "express"
import cors from "cors"
import http from "http"

import {router} from "./routes"

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(router)

export {server}
