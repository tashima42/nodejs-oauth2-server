import { Request, Response } from "express";
import { LoginUserUseCase } from "./login-user-use-case";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) { }

  async handle(request: Request, response: Response): Promise<unknown> {
    const { username, password, country, redirect_uri, state, client_id } = request.body

    try {
      const codeResponse = await this.loginUserUseCase.execute({
        username,
        password,
        country: String(country),
        redirect_uri: String(redirect_uri),
        state: String(state),
        client_id: String(client_id)
      })
      return response.status(200).json({ success: true, ...codeResponse })
    } catch (error: any) {
      console.error(error)
      if (error.code === "UC-LU-001")
        return response.status(404).json({ success: false, message: error.message })
      if (error.code === "UC-LU-002")
        return response.status(401).json({ success: false, message: error.message })
      if (error.code) {
        return response.status(400).json({ success: false, message: error.message })
      }

      return response.status(500).json({ success: false, message: "Unexpected error, contact the developers", stack: error.stack })
    }
  }
}
