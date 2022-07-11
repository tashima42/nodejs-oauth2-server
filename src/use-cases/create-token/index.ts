import { CreateTokenController } from "./create-token-controller";
import { CreateTokenUseCase } from "./create-token-use-case";
import { DateHelper } from "../../helpers/implementations/DateHelper";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { SqliteClientRepository } from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import { SqliteAuthorizationCodeRepository } from "../../repositories/implementations/Sqlite/SqliteAuthorizationCodeRepository";
import { SqliteTokenRepository } from "../../repositories/implementations/Sqlite/SqliteTokenRepository";
import { sqliteDatabase } from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
// Instantiate repositories
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

export { createTokenController }
