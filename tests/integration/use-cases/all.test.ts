process.env.SQLITE_NAME = "database.test.db"
import request from "supertest"
import {app} from "../../../src/index"
import {sqliteDatabase} from "../../../src/index"
import {accessTokenDuration} from "../../../src/constants"

beforeAll(async () => {
  await sqliteDatabase.open()
  await sqliteDatabase.migrate()
  await sqliteDatabase.populate()
})
afterAll(async () => {
  return await sqliteDatabase.dropAll()
})

let code = null
let access_token = null
let refresh_token = null

describe("All use cases", () => {
  test("Authorize user", async () => {
    const redirect_uri = "https://tashima42.github.io/tbx-local-dummy" 
    const state = "stateabc123"
    const res = await request(app).post('/auth/login')
      .type("form")
      .send("username=user1@example.com")
      .send("password=secret")
      .send("country=AR")
      .send(`redirect_uri=${redirect_uri}`)
      .send(`state=${state}`)
      .send("client_id=client1")
      .send("response_type=code")
      .send("failureRedirect=https://tashima42.github.io/tbx-local-dummy")
      .send("cp_convert=dummy2")

    expect(res.statusCode).toEqual(302)
    const location = res.headers.location
    const receivedState = location.split("state=")[1].split("&")[0]
    const receivedCode = location.split("code=")[1].split("&")[0]
    const receivedRedirectUri = location.split("?")[0]
    expect(redirect_uri).toEqual(receivedRedirectUri)
    expect(state).toEqual(receivedState)
    code = receivedCode
  })

  test("Create token", async () => {
    const res = await request(app).post('/auth/token')
      .type("form")
      .send("client_id=client1")
      .send("client_secret=secret")
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
    expect(res.body.subscriber_id).toEqual("subscriber1")
    expect(res.body.country_code).toEqual("AR")
  })

  test("Refresh token", async () => {
    const res = await request(app).post('/auth/refresh-token')
      .type("form")
      .send("client_id=client1")
      .send("client_secret=secret")
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
