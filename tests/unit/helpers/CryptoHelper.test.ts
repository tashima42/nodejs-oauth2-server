import { CryptoHelper } from "../../../src/helpers/implementations/CryptoHelper"

describe("Crypto Helper", () => {
  const cryptoHelper = new CryptoHelper()

  const testString = {
    plain: "TEST",
    hashed: "$2b$10$fBYLMMXOTc56Rxo3rBsdXOmpWpEaNgZOBzdr7LWsGpC93hzN07Rce"
  }

  it("should generate a random hash", () => {
    const randomHash = cryptoHelper.generateRandomHash()
    expect(typeof randomHash).toBe("string")
  })
  it("should hash a string with bcrypt", async () => {
    const hashedString = await cryptoHelper.hashBcrypt(testString.plain)
    expect(typeof hashedString).toBe("string")
  })
  it("should compare a hashed string with bcrypt", async () => {
    const isValidHash = await cryptoHelper.compareBcrypt(testString.plain, testString.hashed)
    expect(isValidHash).toBeTruthy()
  })
})
