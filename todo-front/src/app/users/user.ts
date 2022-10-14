export class User {
  public _username!: string;
  password!: string
  task!: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
