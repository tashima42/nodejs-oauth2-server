const express = require('express')
const router = express.Router() // Instantiate a new router
const {userRepository, tokenRepository} = require("../repositories/index")

router.get('/', (req, res) => {  // Successfully reached if can hit this :)
  res.json({success: true})
})


module.exports = router
