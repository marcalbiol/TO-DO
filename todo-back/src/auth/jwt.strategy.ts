import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ExtractJwt} from "passport-jwt";
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";
import {JwtPayload} from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService,
                private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });
    }

    //FIXME MAPPEO

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userService.findOneById(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }


}