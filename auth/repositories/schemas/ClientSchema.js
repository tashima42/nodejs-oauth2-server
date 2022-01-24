const {Schema, model} = require('mongoose')

const ClientSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
      unique: true
    },
    clientSecret: {
      type: String,
      required: false,
      unique: false,
    },
    redirectUris: [{type: String, required: false}],
    grants: [{type: String, required: false}],
    apiKey: {
      type: String,
      required: false,
      unique: false,
    },
  },
  {timestamps: true}
)

module.exports = model('client', ClientSchema)
