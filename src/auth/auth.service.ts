import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService) {
  }

  async validateUser(username: string, password: string): Promise<any> {

    const user = await this.userService.findOneByName(username);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch) {
      return "Login ok";
    }
    return "Password incorrect";
  }
}
