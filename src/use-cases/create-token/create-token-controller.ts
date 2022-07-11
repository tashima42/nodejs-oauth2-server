import { Request, Response } from "express"
import { CreateTokenUseCase } from "./create-token-use-case"

export class CreateTokenController {
  constructor(private createTokenUseCase: CreateTokenUseCase) { }

  async handle(request: Request, response: Response): Promise<unknown> {
    // Get client and code information to generate the token
    const { client_id, client_secret, code } = request.body

    try {
      const tokenResponse = await this.createTokenUseCase.execute({
        client_id,
        client_secret,
        code,
      })
      return response.status(200).json({ success: true, ...tokenResponse })
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({ success: false, message: error.message })

      return response.status(500).json({ success: false, message: "Unexpected error, contact the developers", stack: error.stack })
    }
  }
}
