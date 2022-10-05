import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ExtractJwt} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        });
    }

}