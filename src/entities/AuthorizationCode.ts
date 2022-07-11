export class AuthorizationCode {
  private code: string;
  private expiresAt: Date;
  private redirectUri: string;
  private clientId: number;
  private userId: number;
  private active: boolean;
  private id?: number;

  constructor(
    code: string,
    expiresAt: Date,
    redirectUri: string,
    clientId: number,
    userId: number,
    active?: boolean | true,
    id?: number
  ) {
    this.code = code;
    this.expiresAt = expiresAt;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.userId = userId;
    this.active = active;
    this.id = id;
  }

  getCode(): string {
    return this.code;
  }
  getExpiresAt(): Date {
    return this.expiresAt;
  }
  getRedirectUri(): string {
    return this.redirectUri;
  }
  getClientId(): number {
    return this.clientId;
  }
  getUserId(): number {
    return this.userId;
  }
  getActive(): boolean {
    return this.active;
  }
  setId(id: number): void {
    this.id = id;
  }
}
