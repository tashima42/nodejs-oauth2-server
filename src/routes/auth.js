const path = require('path') // has path and __dirname
const express = require('express')
const oauthServer = require('../oauth/server.js')

const router = express.Router() // Instantiate a new router

const filePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const {crypto} = require("../utilities/index")
const {userRepository} = require("../repositories/index")

router.get('/', (req, res) => {  // send back a simple form for the oauth
  res.sendFile(filePath)
})

router.post('/authorize', async (req, res, next) => {
  const {username, password, country} = req.body
  const hashedPassword = crypto.hashString(password)
  const user = await userRepository.findUser({username, password: hashedPassword, country})
  console.log("user", user, {username, password, country, hashedPassword})
  if (user) {
    req.body.user = user
    return next()
  }
  const params = [ // Send params back down
    'client_id',
    'redirect_uri',
    'response_type',
    'grant_type',
    'state',
  ]
    .map(a => `${a}=${req.body[a]}`)
    .join('&')
  return res.redirect(`/oauth?success=false&${params}`)
}, (req, res, next) => { // sends us to our redirect with an authorization code in our url
  return next()
}, oauthServer.authorize({
  authenticateHandler: {
    handle: req => {
      console.log("USERRRRR REQ", {body: req.body})
      return req.body.user
    }
  }
}))

router.post('/token', (req, res, next) => {
  next()
}, oauthServer.token({
  requireClientAuthentication: { // whether client needs to provide client_secret
    // 'authorization_code': false,
  },
}))  // Sends back token


module.exports = router
