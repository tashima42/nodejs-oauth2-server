import { Request, Response } from "express";
import { GetUserInfoResponseDTO } from "./get-user-info-DTO";
import { GetUserInfoUseCase } from "./get-user-info-use-case"

export class GetUserInfoController {
  constructor(private getUserInfoUseCase: GetUserInfoUseCase) { }

  async handle(_: Request, response: Response): Promise<unknown> {
    try {
      const { user } = response.locals
      const userInfoResponse: GetUserInfoResponseDTO = await this.getUserInfoUseCase.execute(user)
      return response.status(200).json({ success: true, ...userInfoResponse })
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(401).json({ success: false, message: "Authorization token not found" })
      return response.status(500).json({ success: false, message: "Unexpected error, contact the developers" })
    }
  }
}
