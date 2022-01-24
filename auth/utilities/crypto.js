const crypto = require("crypto")

module.exports = function () {
  return Object.freeze({
    generateRandomCode,
    hashString,
  })
  function generateRandomCode() {
    const seed = crypto.randomBytes(256)
    const code = crypto
      .createHash('sha1')
      .update(seed)
      .digest('hex')
    return code
  }
  function hashString(string) {
    const hash = crypto
      .createHmac('sha256', 'password')
      .update("If you love node so much why don't you marry it?")
      .digest('hex');
    return hash
  }
}

