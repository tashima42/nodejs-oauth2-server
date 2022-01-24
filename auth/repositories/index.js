const mongoose = require("mongoose")

const User = require("./schemas/UserSchema")
const Token = require("./schemas/TokenSchema")
const Client = require("./schemas/ClientSchema")
const AuthorizationCode = require("./schemas/AuthorizationCodeSchema")

const buildUserRepository = require("./User")
const buildClientRepository = require("./Client")
const buildTokenRepository = require("./Token")
const buildAuthorizationCodeRepository = require("./AuthorizationCode")

const user = process.env.DB_USER
const pass = process.env.DB_USER_PWD
const host = process.env.DB_HOST
const connectionUrl = process.env.DB_URL

const url = connectionUrl ? connectionUrl : `mongodb://${host}`

async function connectDb() {
  try {
    await mongoose.connect(url, {
      user: connectionUrl ? undefined : user,
      pass: connectionUrl ? undefined : pass,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    })
    console.info("Connected to db")
  } catch (error) {
    console.error(error)
  }
}

const userRepository = buildUserRepository({User})
const tokenRepository = buildTokenRepository({Token})
const clientRepository = buildClientRepository({Client})
const authorizationCodeRepository = buildAuthorizationCodeRepository({AuthorizationCode})

module.exports = {
  connectDb,
  userRepository,
  tokenRepository,
  clientRepository,
  authorizationCodeRepository,
}
