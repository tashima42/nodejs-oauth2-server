export interface CreateTokenRequestDTO {
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri?: string,
  grant_type?: string,
}

export interface CreateTokenResponseDTO {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
}
