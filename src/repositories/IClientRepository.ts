import {IClient} from "../interfaces/IClient"

export interface IClientRepository {
  getById(id: string): Promise<IClient>,
}
