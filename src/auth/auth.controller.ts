import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  //TODO Cambiar dto a uno para login
  @Post("/login")
  login(@Body() user: CreateUserDto) {
    return this.authService.validateUser(user.username, user.password);

  }
}
