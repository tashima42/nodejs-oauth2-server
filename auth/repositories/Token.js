module.exports = function ({Token}) {
  return Object.freeze({
    saveToken,
    getAccessToken,
    getRefreshToken,
    revokeToken,
  })

  async function saveToken(token, client, user) {
    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    } = token
    const insert = await Token.create({
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      client,
      user,
    })
    console.log("SAVE TOKEN", {token, client, user, insert})
    return insert
  }
  async function getAccessToken(accessToken) {
    if (!accessToken || accessToken === "undefined") return false
    let found = await Token.findOne({accessToken}).lean()
    console.log("GET ACCESS TOKEN", {accessToken, found})
    if (!found) found = getRefreshToken(accessToken)
    return found ? found : false
  }
  async function getRefreshToken(refreshToken) {
    const found = await Token.findOne({refreshToken}).lean()
    console.log("GET REFRESH TOKEN", {refreshToken, found})
    return found ? found : null
  }
  async function revokeToken(token) {
    console.log("REVOKE", token)
    const deleted = await Token.findOneAndDelete(token)
    return deleted ? true : false
  }
}

