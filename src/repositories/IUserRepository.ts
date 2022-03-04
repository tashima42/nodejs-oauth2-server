import {IUser} from "../interfaces/IUser"
export interface IUserRepository {
  findByUsernameAndCountry(username: string, country: string): Promise<IUser>,
}
