export class Client {
  private name: string;
  private clientId: string;
  private clientSecret: string;
  private redirectUris?: Array<string>;
  private id?: number;

  constructor(
    name: string,
    clientId: string,
    clientSecret: string,
    redirectUris?: Array<string>,
    id?: number
  ) {
    this.name = name;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUris = redirectUris;
    this.id = id;
  }
  getName(): string {
    return this.name
  }
  getClientId(): string {
    return this.clientId
  }
  getId(): number {
    return this.id;
  }
  getClientSecret(): string {
    return this.clientSecret;
  }
  getRedirectUris(): Array<string> {
    return this.redirectUris;
  }
  setId(id: number): void {
    this.id = id
  }
}
