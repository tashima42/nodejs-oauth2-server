import {CreateTokenController} from "./create-token-controller";
import {CreateTokenUseCase} from "./create-token-use-case";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteClientRepository} from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import {SqliteAuthorizationCodeRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationCodeRepository";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository";

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const tokenRepository = new SqliteTokenRepository(sqliteDatabase)
const authorizeCodeRepository = new SqliteAuthorizationCodeRepository(sqliteDatabase)
const clientRepository = new SqliteClientRepository(sqliteDatabase)

// Instantiate Use Case
const createTokenUseCase = new CreateTokenUseCase(
  tokenRepository,
  authorizeCodeRepository,
  clientRepository,
  cryptoHelper,
  dateHelper,
)

// Instantiate Controller
const createTokenController = new CreateTokenController(createTokenUseCase)

export {createTokenController}
