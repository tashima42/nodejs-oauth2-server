import {CreateTokenController} from "./create-token-controller";
import {CreateTokenUseCase} from "./create-token-use-case";
import {MockUserRepository} from "../../repositories/implementations/Mock/MockUserRepository";
import {MockClientRepository} from "../../repositories/implementations/Mock/MockClientRepository";
import {MockTokenRepository} from "../../repositories/implementations/Mock/MockTokenRepository";
import {MockAuthorizationCodeRepository} from "../../repositories/implementations/Mock/MockAuthorizationCodeRepository";
import {DateHelper} from "../../helpers/implementations/DateHelper";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";

const cryptoHelper = new CryptoHelper()
const dateHelper = new DateHelper()
const tokenRepository = new MockTokenRepository()
const authorizeCodeRepository = new MockAuthorizationCodeRepository(cryptoHelper)
const clientRepository = new MockClientRepository()

const createTokenUseCase = new CreateTokenUseCase(
  tokenRepository,
  authorizeCodeRepository,
  clientRepository,
  cryptoHelper,
  dateHelper,
)

const createTokenController = new CreateTokenController(createTokenUseCase)

export {createTokenController}
