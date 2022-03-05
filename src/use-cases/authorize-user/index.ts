import {AuthorizeUserUseCase} from "./authorize-user-use-case";
import {AuthorizeUserController} from "./authorize-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {SqliteAuthorizationCodeRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationCodeRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteClientRepository} from "../../repositories/implementations/Sqlite/SqliteClientRepository";

const sqliteDatabase = new SqliteDatabase()
const authorizationCodeRepository = new SqliteAuthorizationCodeRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)
const cryptoHelper = new CryptoHelper()
const clientRepository = new SqliteClientRepository(sqliteDatabase)
const dateHelper = new DateHelper()

const authorizeUserUseCase = new AuthorizeUserUseCase(
  userRepository,
  clientRepository,
  authorizationCodeRepository,
  cryptoHelper,
  dateHelper,
)
const authorizeUserController = new AuthorizeUserController(authorizeUserUseCase)

export {authorizeUserController}
