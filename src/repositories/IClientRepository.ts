import { Client } from "../entities/Client"

export interface IClientRepository {
  create(client: Client): Promise<Client>,
  getByClientId(client_id: string): Promise<Client>,
}
