import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AutomapperModule} from "@automapper/nestjs";
import {PassportModule} from "@nestjs/passport";
import {UserProfile} from "../profile/user-profile";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AutomapperModule, PassportModule],
    controllers: [UsersController],
    providers: [UsersService, UserProfile],
    exports: [UsersService, UsersModule, TypeOrmModule.forFeature([User])]
})
export class UsersModule {
}
