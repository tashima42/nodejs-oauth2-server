process.env.SQLITE_NAME = "database.test.db"
import request from "supertest"
import { app } from "../../../src/index"
import { sqliteDatabase } from "../../../src/index"
import { accessTokenDuration } from "../../../src/constants"

beforeAll(async () => {
  await sqliteDatabase.open()
  await sqliteDatabase.migrate()
  await sqliteDatabase.populate()
})
afterAll(async () => {
  return await sqliteDatabase.dropAll()
})

let code: string = null
let access_token: string = null
let refresh_token: string = null
let client_id: string = null
let client_secret: string = null
const username = "user3@example.com"
const password = "password"
const country = "AR"
const subscriber_id = "ST-92348249320420"


const redirect_uri = "https://tashima42.github.io/tbx-local-dummy"

describe("All use cases", () => {
  test("Register User", async () => {
    const res = await request(app).post('/user')
      .type("form")
      .send(`username=${username}`)
      .send(`password=${password}`)
      .send(`country=${country}`)
      .send(`subscriber_id=${subscriber_id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.username).toEqual(username)
    expect(typeof res.body.password).toEqual("string")
    expect(res.body.country).toEqual(country)
    expect(res.body.subscriber_id).toEqual(subscriber_id)
  })
  test("Register Client", async () => {
    const name = "Test Client"
    const res = await request(app).post('/client')
      .type("form")
      .send(`name=${name}`)
      .send(`redirect_uri=${redirect_uri}`)

    expect(res.statusCode).toEqual(200)
    client_id = res.body.client_id
    client_secret = res.body.client_secret
    expect(typeof res.body.client_id).toEqual("string")
    expect(typeof res.body.client_secret).toEqual("string")
  })
  test("Authorize user", async () => {
    const state = "stateabc123"
    const res = await request(app).post('/auth/login')
      .type("form")
      .send(`username=${username}`)
      .send(`password=${password}`)
      .send(`country=${country}`)
      .send(`redirect_uri=${redirect_uri}`)
      .send(`state=${state}`)
      .send(`client_id=${client_id}`)
      .send("response_type=code")
      .send("failureRedirect=https://tashima42.github.io/tbx-local-dummy")
      .send("cp_convert=dummy2")

    expect(res.statusCode).toEqual(200)
    const receivedState = res.body.state
    const receivedCode = res.body.code
    const receivedRedirectUri = res.body.redirect_uri
    expect(redirect_uri).toEqual(receivedRedirectUri)
    expect(state).toEqual(receivedState)
    code = receivedCode
  })

  test("Create token", async () => {
    const res = await request(app).post('/auth/token')
      .type("form")
      .send(`client_id=${client_id}`)
      .send(`client_secret=${client_secret}`)
      .send(`code=${code}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.token_type).toEqual("Bearer")
    expect(res.body.expires_in).toEqual(accessTokenDuration)
    expect(typeof res.body.access_token).toEqual("string")
    expect(typeof res.body.refresh_token).toEqual("string")

    access_token = res.body.access_token
    refresh_token = res.body.refresh_token
  })

  test("Get user info", async () => {
    const res = await request(app).get('/userinfo')
      .set("Authorization", `Bearer ${access_token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.subscriber_id).toEqual(subscriber_id)
    expect(res.body.country_code).toEqual("AR")
  })

  test("Refresh token", async () => {
    const res = await request(app).post('/auth/refresh-token')
      .type("form")
      .send(`client_id=${client_id}`)
      .send(`client_secret=${client_secret}`)
      .send(`refresh_token=${refresh_token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.token_type).toEqual("Bearer")
    expect(res.body.expires_in).toEqual(accessTokenDuration)
    expect(typeof res.body.access_token).toEqual("string")
    expect(typeof res.body.refresh_token).toEqual("string")

    access_token = res.body.access_token
    refresh_token = res.body.refresh_token
  })
})
