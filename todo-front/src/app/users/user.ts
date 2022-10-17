import {List} from "postcss/lib/list";

export class User {

  id!: number;
  public _username!: string;
  password!: string
  task!: Array<Task>

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

}
