import {GetUserInfoRequestDTO} from "./get-user-info-request-DTO"
import {GetUserInfoResponseDTO} from "./get-user-info-response-DTO"
import {ITokenRepository} from "../../repositories/ITokenRepository"

export class GetUserInfoUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(data: GetUserInfoRequestDTO): Promise<GetUserInfoResponseDTO> {
    // Get token
    const {token} = data
    // Find token on the database
    const tokenFound = await this.tokenRepository.getByAccessToken(token)
    if (!tokenFound) throw {code: "UC-GI-001", message: "Token not found"}
    // Get user information from token
    const {user: {country, subscriberId}} = tokenFound

    const userInfo: GetUserInfoResponseDTO = {
      subscriber_id: subscriberId,
      country_code: country,
    }
    return userInfo
  }
}
