const express = require('express')
const cors = require("cors")

const app = express()
const port = 3030
const bodyParser = require('body-parser')
const oauthServer = require('./oauth/server.js')

const {connectDb, tokenRepository} = require("./repositories/index")

//Here we are configuring express to use body-parser as middle-ware.
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/", require("./routes/routes.js"))
/*
app.use('/client', require('./routes/client.js')) // Client routes
app.use('/oauth', require('./routes/auth.js')) // routes to access the auth stuff
app.use('/user', require('./routes/user.js')) // routes to access the auth stuff
*/
// Note that the next router uses middleware. That protects all routes within this middleware
app.use('/secure', (req, res, next) => {
  return next()
}, oauthServer.authenticate(), require('./routes/secure.js')) // routes to access the protected stuff

app.use('/userinfo', async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1]
  const token = await tokenRepository.getAccessToken(accessToken)
  if (token) {
    const {user} = token
    const {subscriber_id, country} = user
    return res.json({subscriber_id, country_code: country})
  }
  return res.status(404)
}, oauthServer.authenticate())


connectDb().then(() => {
  app.listen(port)
  console.log("Oauth Server listening on port ", port)
})

module.exports = app // For testing
