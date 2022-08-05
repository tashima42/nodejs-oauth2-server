import { IUserRepository } from "../../IUserRepository";
import { User } from "../../../entities/User"
import { PostgresDatabase } from "./index";

export class PostgresUserRepository implements IUserRepository {
  constructor(private postgresDatabase: PostgresDatabase) { }

  async create(user: User): Promise<User> {
    const created = await this.postgresDatabase.client.query({
      text: `INSERT INTO user (username, password, country, subscriber_id) VALUES ($1, $2, $3, $4)`,
      values: [
        user.getUsername(),
        user.getPassword(),
        user.getCountry(),
        user.getSubscriberId(),
      ]
    })
    user.setId(created.lastID)
    return user
  }
  async findByUsernameAndCountry(username: string, country: string): Promise<User> {
    const userFound = await this.postgresDatabase.client.get({
      text: `SELECT username, password, country, subscriber_id, id FROM user WHERE username = $1 AND country = $2;`,
      values: [username, country]
    })
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
