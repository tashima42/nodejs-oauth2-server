export interface ICryptoHelper {
  hashBcrypt(string: string): Promise<string>,
  compareBcrypt(plain: string, hashed: string): Promise<Boolean>,
  generateRandomHash(): string,
}
