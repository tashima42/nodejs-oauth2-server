import {CreateTokenController} from "./create-token-controller";
import {CreateTokenUseCase} from "./create-token-use-case";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteClientRepository} from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import {SqliteAuthorizationCodeRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationCodeRepository";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository";

const sqliteDatabase = new SqliteDatabase()
const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
const tokenRepository = new SqliteTokenRepository(sqliteDatabase)
const authorizeCodeRepository = new SqliteAuthorizationCodeRepository(sqliteDatabase)
const clientRepository = new SqliteClientRepository(sqliteDatabase)

const createTokenUseCase = new CreateTokenUseCase(
  tokenRepository,
  authorizeCodeRepository,
  clientRepository,
  cryptoHelper,
  dateHelper,
)

const createTokenController = new CreateTokenController(createTokenUseCase)

export {createTokenController}
