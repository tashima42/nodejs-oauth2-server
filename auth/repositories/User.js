module.exports = function ({User}) {
  return Object.freeze({
    saveUser,
    findUser,
    findById,
  })

  async function saveUser({username, password, packages, country, subscriber_id}) {
    const insertedUser = await User.create({username, password, packages, country, subscriber_id})
    return insertedUser
  }
  async function findUser(searchParams) {
    const found = await User.findOne(searchParams).lean()
    return found ? found : null
  }
  async function findById(id) {
    const foundUser = await User.findOne({_id: id})
    return foundUser ? foundUser : null
  }
}
