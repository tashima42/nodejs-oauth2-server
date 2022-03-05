export interface IUser {
  username: string,
  password: string,
  packages: Array<string>,
  country: string,
  subscriberId: string,
  id?: string,
}
