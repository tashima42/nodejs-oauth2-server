import { CreateUserRequestDTO, CreateUserResponseDTO } from "./create-user-DTO";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { IUserRepository } from "../../repositories/IUserRepository";
import { User } from "../../entities/User";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoHelper: CryptoHelper,
  ) { }

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const { username, password, country, subscriber_id } = data

    const hashedPassword = await this.cryptoHelper.hashBcrypt(password)
    const user = new User(
      username,
      hashedPassword,
      country,
      subscriber_id,
    )

    const createdUser = await this.userRepository.create(user)

    const userResponse: CreateUserResponseDTO = {
      username: createdUser.getUsername(),
      password: createdUser.getPassword(),
      country: createdUser.getCountry(),
      subscriber_id: createdUser.getSubscriberId()
    }
    return userResponse
  }
}
