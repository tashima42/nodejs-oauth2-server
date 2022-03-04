import {IUserRepository} from "../../IUserRepository";
import {IUser} from "../../../interfaces/IUser";

export class MockUserRepository implements IUserRepository {
  async findByUsernameAndCountry(username: string, country: string): Promise<IUser> {
    const mockData: Array<IUser> = [{
      _id: "q289yruiasdf9ih23yui9fwequifqwe",
      username: "user1@example.com",
      password: "$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO", // secret
      packages: ["urn:tve:tbx"],
      country: "BR",
      subscriberId: "subscriber1",
    }]

    const user = mockData.find(record => {
      if (record.username === username &&
        record.country === country)
        return true

      return false
    })

    return user
  }
}
