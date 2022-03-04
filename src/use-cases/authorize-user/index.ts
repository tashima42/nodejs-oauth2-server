import {AuthorizeUserUseCase} from "./authorize-user-use-case";
import {AuthorizeUserController} from "./authorize-user-controller";
import {MockUserRepository} from "../../repositories/implementations/Mock/MockUserRepository";
import {MockAuthorizationCodeRepository} from "../../repositories/implementations/Mock/MockAuthorizationCodeRepository";
import {MockClientRepository} from "../../repositories/implementations/Mock/MockClientRepository";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {DateHelper} from "../../helpers/implementations/DateHelper";

const cryptoHelper = new CryptoHelper()
const userRepository = new MockUserRepository()
const clientRepository = new MockClientRepository()
const authorizationCodeRepository = new MockAuthorizationCodeRepository(cryptoHelper)
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
