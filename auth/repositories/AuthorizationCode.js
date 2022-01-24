module.exports = function ({AuthorizationCode}) {
  return Object.freeze({
    saveAuthorizationCode,
    getAuthorizationCode,
    revokeAuthorizationCode,
  })

  async function saveAuthorizationCode(code, client, user) {
    const {authorizationCode, expiresAt} = code
    const insert = await AuthorizationCode.create({
      authorizationCode,
      expiresAt,
      redirectUri: '',
      client,
      user,
    })
    return insert
  }
  async function getAuthorizationCode(authorizationCode) {
    if (!authorizationCode) return false
    const found = await AuthorizationCode.findOne({authorizationCode}).lean()
    return found ? found : null
  }
  async function revokeAuthorizationCode(authorizationCode) {
    const deleted = await AuthorizationCode.findOneAndDelete(authorizationCode)
    return deleted ? true : false
  }
}

