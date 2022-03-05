import {IUserRepository} from "../../IUserRepository";
import {IUser} from "../../../interfaces/IUser";
import {SqliteDatabase} from "./index";

export class SqliteUserRepository implements IUserRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}
  async findByUsernameAndCountry(username: string, country: string): Promise<IUser> {
    const db = await this.sqliteDatabase.open()
    const userFound = await db.get(`SELECT * FROM user
      WHERE username = ? AND country = ?;`,
      username,
      country,
    )
    if (!userFound) throw {code: "RS-IS-SE-UR-001", message: "User not found"}
    const user: IUser = {
      username: userFound.username,
      password: userFound.password,
      packages: userFound.packages.split("|%s|"),
      country: userFound.country,
      subscriberId: userFound.subscriber_id,
      id: userFound.id,
    }
    return user
  }
}
