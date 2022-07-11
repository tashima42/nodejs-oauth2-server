export interface RefreshTokenRequestDTO {
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

export interface RefreshTokenResponseDTO {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
}
