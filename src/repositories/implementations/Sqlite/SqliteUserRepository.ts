import { IUserRepository } from "../../IUserRepository";
import { User } from "../../../entities/User"
import { SqliteDatabase } from "./index";

export class SqliteUserRepository implements IUserRepository {
  constructor(private sqliteDatabase: SqliteDatabase) { }

  async create(user: User): Promise<User> {
    const created = await this.sqliteDatabase.db.run(`INSERT INTO user 
        (username, password, country, subscriber_id) 
        VALUES (?, ?, ?, ?)`,
      user.getUsername(),
      user.getPassword(),
      user.getCountry(),
      user.getSubscriberId(),
    )
    user.setId(created.lastID)
    return user
  }
  async findByUsernameAndCountry(username: string, country: string): Promise<User> {
    const userFound = await this.sqliteDatabase.db.get(`SELECT
          username, password, country, subscriber_id, id
      FROM user
      WHERE username = ? AND country = ?;`,
      username,
      country,
    )
    if (!userFound) throw { code: "RS-IS-SE-UR-001", message: "User not found" }
    const user = new User(
      userFound.username,
      userFound.password,
      userFound.country,
      userFound.subscriber_id,
      userFound.id,
    )
    return user
  }
}
