import {RefreshTokenController} from "./refresh-token-controller";
import {RefreshTokenUseCase} from "./refresh-token-use-case";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteClientRepository} from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository";
import {sqliteDatabase} from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
// Instantiate repositories
const tokenRepository = new SqliteTokenRepository(sqliteDatabase)
const clientRepository = new SqliteClientRepository(sqliteDatabase)

// Instantiate Use Case
const refreshTokenUseCase = new RefreshTokenUseCase(
  tokenRepository,
  clientRepository,
  cryptoHelper,
  dateHelper,
)

// Instantiate Controller
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

export {refreshTokenController}
