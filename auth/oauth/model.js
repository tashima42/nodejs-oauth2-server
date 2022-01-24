const {
  clientRepository,
  tokenRepository,
  authorizationCodeRepository,
} = require("../repositories/index")
const {crypto} = require("../utilities/index")
module.exports = {
  getClient: clientRepository.getClient,
  saveToken: tokenRepository.saveToken,
  getAccessToken: tokenRepository.getAccessToken,
  getRefreshToken: tokenRepository.getAccessToken,
  revokeToken: tokenRepository.revokeToken,
  generateAuthorizationCode: (client, user, scope, callback) => {
    const code = crypto.generateRandomCode()
    return callback(null, code)
  },
  saveAuthorizationCode: authorizationCodeRepository.saveAuthorizationCode,
  getAuthorizationCode: authorizationCodeRepository.getAuthorizationCode,
  revokeAuthorizationCode: authorizationCodeRepository.revokeAuthorizationCode,
  verifyScope: (token, scope) => {
    console.log("VERIFY SCOPE", {token, scope})
    const userHasAccess = true  // return true if this user / client combo has access to this resource
    return new Promise(resolve => resolve(userHasAccess))
  }
}
