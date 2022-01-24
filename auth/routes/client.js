const express = require('express')
const router = express.Router()
const {clientRepository} = require("../repositories/index")
const {crypto} = require("../utilities/index")

//router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/clientAuthenticate.html')))

//router.get('/app', (req, res) => res.sendFile(path.join(__dirname, '../public/clientApp.html')))

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

module.exports = router
