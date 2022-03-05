import {GetUserInfoUseCase} from "./get-user-info-use-case";
import {GetUserInfoController} from "./get-user-info-controller";
import {SqliteTokenRepository} from "../../repositories/implementations/Sqlite/SqliteTokenRepository";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";

const sqliteDatabase = new SqliteDatabase()
const mockTokenRepository = new SqliteTokenRepository(sqliteDatabase)
const getUserInfoUseCase = new GetUserInfoUseCase(
  mockTokenRepository,
)

const getUserInfoController = new GetUserInfoController(getUserInfoUseCase)

export {getUserInfoController}
