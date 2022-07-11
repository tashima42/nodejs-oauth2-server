import { Client } from "../entities/Client"

export interface IClientRepository {
  getByClientId(client_id: string): Promise<Client>,
}
