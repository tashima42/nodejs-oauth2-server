export interface CreateClientRequestDTO {
  name: string,
  redirect_uri: string,
}

export interface CreateClientResponseDTO {
  name: string,
  client_id: string,
  client_secret: string,
  redirect_uris: Array<string>,
}
