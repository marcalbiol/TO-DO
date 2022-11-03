import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {AuthController} from "./auth.controller";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [UsersModule, PassportModule.register({
        defaultStrategy: 'jwt', property: 'user', session: false
    }), JwtModule.register({
        secret: 'secretKey', // VARIABLE DE ENTORNO
        signOptions: {
            expiresIn: '60s',
        }
    }),],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, PassportModule, JwtModule],
    controllers: [AuthController]
})
export class AuthModule {
}
