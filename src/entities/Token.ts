export class Token {
  private accessToken: string;
  private accessTokenExpiresAt: Date;
  private refreshToken: string;
  private clientId: number;
  private userId: number;
  private active?: boolean;
  private id?: number;

  constructor(
    accessToken: string,
    accessTokenExpiresAt: Date,
    refreshToken: string,
    clientId: number,
    userId: number,
    active?: boolean | true,
    id?: number
  ){
    this.accessToken = accessToken
    this.accessTokenExpiresAt = accessTokenExpiresAt
    this.refreshToken = refreshToken
    this.clientId = clientId
    this.userId = userId
    this.active = active || true
    this.id = id
  }
  getAccessToken(): string {
    return this.accessToken;
  }
  getAccessTokenExpiresAt(): Date {
    return this.accessTokenExpiresAt;
  }
  getRefreshToken(): string {
    return this.refreshToken;
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
  setId(id: number) {
    this.id = id;
  }
}
