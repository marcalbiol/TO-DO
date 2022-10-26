import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {AutomapperModule} from "@automapper/nestjs";
import {PassportModule} from "@nestjs/passport";
import {MapperProfile} from "../profile/mapper-profile";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AutomapperModule, PassportModule],
    controllers: [UsersController],
    providers: [UsersService, MapperProfile],
    exports: [UsersService, UsersModule, TypeOrmModule.forFeature([User])]
})
export class UsersModule {
}
