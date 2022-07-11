import { GetUserInfoResponseDTO } from "./get-user-info-DTO"
import { User } from "../../entities/User"

export class GetUserInfoUseCase {
  constructor() { }

  async execute(user: User): Promise<GetUserInfoResponseDTO> {
    const userInfo: GetUserInfoResponseDTO = {
      subscriber_id: user.getSubscriberId(),
      country_code: user.getCountry(),
    }
    return userInfo
  }
}
