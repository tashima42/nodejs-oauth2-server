export class Client {
  private clientId: string;
  private clientSecret: string;
  private redirectUris?: Array<string>;
  private grants?: Array<string>;
  private id?: number;

  constructor(
    clientId: string,
    clientSecret: string,
    redirectUris?: Array<string>,
    grants?: Array<string>,
    id?: number
  ) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUris = redirectUris;
    this.grants = grants;
    this.id = id;
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
}
