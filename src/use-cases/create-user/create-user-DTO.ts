export interface CreateUserRequestDTO {
  username: string,
  password: string,
  subscriber_id: string,
  country: string,
}

export interface CreateUserResponseDTO {
  username: string,
  password: string,
  subscriber_id: string,
  country: string,
}
