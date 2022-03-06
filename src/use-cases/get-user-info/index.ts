import {GetUserInfoUseCase} from "./get-user-info-use-case";
import {GetUserInfoController} from "./get-user-info-controller";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const tokenRepository = new SqliteTokenRepository(sqliteDatabase)
// Instantiate use case
const getUserInfoUseCase = new GetUserInfoUseCase(tokenRepository)
// Instantiate controller
const getUserInfoController = new GetUserInfoController(getUserInfoUseCase)

export {getUserInfoController}
