import { Request, Response } from "express"
import { CreateClientUseCase } from "./create-client-use-case"

export class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) { }

  async handle(request: Request, response: Response): Promise<unknown> {
    const { name, redirect_uri } = request.body

    try {
      const clientResponse = await this.createClientUseCase.execute({
        name,
        redirect_uri,
      })
      return response.status(200).json({ success: true, ...clientResponse })
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({ success: false, message: error.message })

      return response.status(500).json({ success: false, message: "Unexpected error, contact the developers", stack: error.stack })
    }
  }
}
