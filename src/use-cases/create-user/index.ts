import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { sqliteDatabase } from "../../index"
import { SqliteUserRepository } from "../../repositories/implementations/Sqlite/SqliteUserRepository";

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const userRepository = new SqliteUserRepository(sqliteDatabase)

// Instantiate Use Case
const createUserUseCase = new CreateUserUseCase(
  userRepository,
  cryptoHelper,
)

// Instantiate Controller
const createUserController = new CreateUserController(createUserUseCase)

export { createUserController }
