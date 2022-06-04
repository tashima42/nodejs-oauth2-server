import {LoginUserUseCase} from "./login-user-use-case";
import {LoginUserController} from "./login-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {SqliteAuthorizationCodeRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationCodeRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {SqliteClientRepository} from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import {sqliteDatabase} from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
// Instantiate repositories
const authorizationCodeRepository = new SqliteAuthorizationCodeRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)
const clientRepository = new SqliteClientRepository(sqliteDatabase)

// Instantiate Use Case
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  clientRepository,
  authorizationCodeRepository,
  cryptoHelper,
  dateHelper,
)

// Instantiate Controller
const loginUserController = new LoginUserController(loginUserUseCase)

export {loginUserController}
