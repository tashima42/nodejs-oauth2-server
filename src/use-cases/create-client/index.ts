import { CreateClientController } from "./create-client-controller";
import { CreateClientUseCase } from "./create-client-use-case";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { SqliteClientRepository } from "../../repositories/implementations/Sqlite/SqliteClientRepository";
import { sqliteDatabase } from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const clientRepository = new SqliteClientRepository(sqliteDatabase)

// Instantiate Use Case
const createClientUseCase = new CreateClientUseCase(
  clientRepository,
  cryptoHelper,
)

// Instantiate Controller
const createClientController = new CreateClientController(createClientUseCase)

export { createClientController }
