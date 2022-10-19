import {Body, Controller, Post, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    //TODO Cambiar dto a uno para login

    @Post("/login")
    async login(@Body() user: CreateUserDto): Promise<{ access_token: string }> {
        const {username, password} = user;
        const valid = await this.authService.validateUser(username, password);
        if (!valid) {
            throw new UnauthorizedException();
        }
        return await this.authService.generateAccessToken(username);
    }


}
