import {Request, Response} from "express";
import {AuthorizeUserUseCase} from "./authorize-user-use-case";

export class AuthorizeUserController {
  constructor(private authorizeUserUseCase: AuthorizeUserUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {username, password, country, redirect_uri, state, client_id} = request.body

    try {
      const authorizationCode = await this.authorizeUserUseCase.execute({
        username,
        password,
        country: String(country),
        redirect_uri: String(redirect_uri),
        state: String(state),
        client_id: String(client_id)
      })
      // If the authorization code was created, redirect it to the informed URI
      return response.redirect(301, `${redirect_uri}?state=${state}&code=${authorizationCode}`)
    } catch (error: any) {
      console.error(error)
      if (error.code === "UC-AU-001")
        return response.status(404).json({success: false, message: error.message})
      if (error.code === "UC-AU-002")
        return response.status(401).json({success: false, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
