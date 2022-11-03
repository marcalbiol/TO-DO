import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt";
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt.payload";


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private readonly jwtService: JwtService) {
    }


    async validateUser(username: string, password: string): Promise<User> {

        const user = await this.userService.findOne({where: {username}})

        if (!user) throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async generateAccessToken(username: string) {

        const user = await this.userService.findOne({where: {username}});
        const payload: JwtPayload = {userId: user.id};

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
