export class User {
  private username: string;
  private password: string;
  private country: string;
  private subscriberId: string;
  private id?: number;

  constructor(
    username: string,
    password: string,
    country: string,
    subscriberId: string,
    id?: number,
  ) {
    this.username = username;
    this.password = password;
    this.country = country;
    this.subscriberId = subscriberId;
    this.id = id;
  }
  getId(): number {
    return this.id;
  }
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getSubscriberId(): string {
    return this.subscriberId;
  }
  getCountry(): string {
    return this.country;
  }
  setId(id: number): void {
    this.id = id;
  }
}
