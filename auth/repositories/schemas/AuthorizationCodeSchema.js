const {Schema, model} = require('mongoose')

const AuthorizationCode = new Schema(
  {
    authorizationCode: {
      type: String,
      required: true,
      unique: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    redirectUri: {
      type: String,
      required: false,
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

module.exports = model('authorizationCode', AuthorizationCode)
