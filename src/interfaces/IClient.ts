export interface IClient {
  clientId: string,
  clientSecret: string,
  redirectUris?: Array<string>,
  grants?: Array<string>,
  apiKey?: string,
  id?: string,
}
