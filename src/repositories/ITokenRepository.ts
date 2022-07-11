import { User } from '../entities/User';
import { Token } from "../entities/Token";

export interface ITokenRepository {
  create(token: Token): Promise<Token>,
  getByAccessTokenWithUser(accessToken: string): Promise<{ user: User, token: Token }>,
  getByRefreshToken(refreshToken: string): Promise<Token>,
  disable(accessToken: string): Promise<void>,
}
