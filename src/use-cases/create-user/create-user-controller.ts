import { Request, Response } from "express"
import { CreateUserUseCase } from "./create-user-use-case"

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) { }

  async handle(request: Request, response: Response): Promise<unknown> {
    const { username, password, country, subscriber_id } = request.body

    try {
      const userResponse = await this.createUserUseCase.execute({
        username,
        password,
        country,
        subscriber_id
      })
      return response.status(200).json({ success: true, ...userResponse })
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({ success: false, message: error.message })

      return response.status(500).json({ success: false, message: "Unexpected error, contact the developers", stack: error.stack })
    }
  }
}
