import {Request, Response} from "express"
import {RefreshTokenUseCase} from "./refresh-token-use-case"

export class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    // Get client and code information to generate the token
    const {client_id, client_secret, refresh_token} = request.body

    try {
      const token = await this.refreshTokenUseCase.execute({
        client_id,
        client_secret,
        refresh_token,
      })
      return response.status(200).json(token)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
