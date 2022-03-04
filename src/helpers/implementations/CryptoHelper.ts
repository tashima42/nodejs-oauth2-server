import {ICryptoHelper} from "../ICryptoHelper"
import crypto from "crypto"
import bcrypt from "bcrypt"
const SALT_ROUNDS = 10


export class CryptoHelper implements ICryptoHelper {
  generateRandomHash() {
    const seed = crypto.randomBytes(256)
    const code = crypto.createHash('sha1').update(seed).digest('hex')
    return code
  }
  async hashBcrypt(string: string) {
    return await bcrypt.hash(string, SALT_ROUNDS)
  }
  async compareBcrypt(plain: string, hashed: string) {
    return await bcrypt.compare(plain, hashed)
  }
}
