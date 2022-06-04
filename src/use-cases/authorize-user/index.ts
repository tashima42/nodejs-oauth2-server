import {AuthorizeUserUseCase} from "./authorize-user-use-case";
import {AuthorizeUserMiddleware} from "./authorize-user-middleware";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository"
import {sqliteDatabase} from "../../index"

// Instantiate helpers
const dateHelper = new DateHelper()
// Instantiate repositories
const tokenRepository = new SqliteTokenRepository(sqliteDatabase)

// Instantiate Use Case
const authorizeUserUseCase = new AuthorizeUserUseCase(
  tokenRepository,
  dateHelper,
)

// Instantiate Controller
const authorizeUserMiddleware = new AuthorizeUserMiddleware(authorizeUserUseCase)

export {authorizeUserMiddleware}
