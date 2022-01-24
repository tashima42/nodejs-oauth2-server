const {Schema, model} = require('mongoose')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    packages: [
      {
        type: String,
        required: false
      }
    ],
    country: {
      type: String,
      required: true
    },
    subscriber_id: {
      type: String,
      required: true,
      unique: true
    },
  },
  {timestamps: true}
)

module.exports = model('user', UserSchema)
