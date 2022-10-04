import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./loca.strategy";

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
