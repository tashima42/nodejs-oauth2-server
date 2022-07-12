import { User } from "../entities/User"
export interface IUserRepository {
  create(user: User): Promise<User>,
  findByUsernameAndCountry(username: string, country: string): Promise<User>,
}
