const express = require('express')
const router = express.Router()
const {userRepository} = require("../repositories/index")
const {crypto} = require("../utilities/index")

router.post('/create', async (req, res) => {
  const {username, password, packages, country} = req.body
  const hashedPassword = crypto.hashString(password)
  const subscriber_id = crypto.generateRandomCode()
  const createdUser = await userRepository.saveUser({username, password: hashedPassword, packages, country, subscriber_id})
  delete createdUser.password
  return res.json(createdUser)
})

module.exports = router
