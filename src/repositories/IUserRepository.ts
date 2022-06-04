import {User} from "../entities/User"
export interface IUserRepository {
  findByUsernameAndCountry(username: string, country: string): Promise<User>,
}
