const path = require('path') // has path and __dirname
const express = require('express')
const oauthServer = require('../oauth/server.js')

const router = express.Router() // Instantiate a new router

const filePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const {crypto} = require("../utilities/index")
const {userRepository} = require("../repositories/index")

// AUTH
router.get('/login', (req, res) => {  // send back a simple form for the oauth
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

//  CLIENT
router.post('/create', async (req, res) => {
  const {clientId, redirectUris, grants} = req.body
  const apiKey = crypto.generateRandomCode()
  //const clientSecret = crypto.generateRandomCode()
  const createdClient = await clientRepository.saveClient({
    clientId,
    //clientSecret,
    redirectUris,
    grants,
    apiKey,
  })
  return res.json({createdClient})
})

// USER

router.post('/create', async (req, res) => {
  const {username, password, packages, country} = req.body
  const hashedPassword = crypto.hashString(password)
  const subscriber_id = crypto.generateRandomCode()
  const createdUser = await userRepository.saveUser({username, password: hashedPassword, packages, country, subscriber_id})
  delete createdUser.password
  return res.json(createdUser)
})

module.exports = router

