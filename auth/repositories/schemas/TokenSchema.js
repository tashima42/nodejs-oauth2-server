const {Schema, model} = require('mongoose')

const TokenSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
      unique: true
    },
    accessTokenExpiresAt: {
      type: Date,
      required: true
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true
    },
    refreshTokenExpiresAt: {
      type: Date,
      required: true
    },
    client: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
  },
  {timestamps: true}
)

module.exports = model('token', TokenSchema)
