import { IClientRepository } from "../../repositories/IClientRepository";
import { CreateClientRequestDTO, CreateClientResponseDTO } from "./create-client-DTO";
import { CryptoHelper } from "../../helpers/implementations/CryptoHelper";
import { Client } from "../../entities/Client";

export class CreateClientUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private cryptoHelper: CryptoHelper,
  ) { }

  async execute(data: CreateClientRequestDTO): Promise<CreateClientResponseDTO> {
    const { name, redirect_uri } = data

    const client_id = this.cryptoHelper.generateRandomHash()
    const client_secret = this.cryptoHelper.generateRandomHash()
    const client_secret_hashed = await this.cryptoHelper.hashBcrypt(client_secret)
    const client = new Client(
      name,
      client_id,
      client_secret_hashed,
      [redirect_uri],
    )

    const createdClient = await this.clientRepository.create(client)

    const clientResponse: CreateClientResponseDTO = {
      name: createdClient.getName(),
      client_id: createdClient.getClientId(),
      client_secret,
      redirect_uris: createdClient.getRedirectUris()
    }
    return clientResponse
  }
}
