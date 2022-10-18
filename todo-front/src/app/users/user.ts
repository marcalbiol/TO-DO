export class User {

  id!: number;
  password!: string
  task!: Array<Task>

  public _username!: string;

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}

export class Task {
  id!: number;
  description!: number
  createAt!: Date

}
