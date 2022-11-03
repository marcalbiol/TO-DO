import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ExtractJwt} from "passport-jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService,
                private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });
    }

    /*
    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userService.findOneById(payload.userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

     */

}