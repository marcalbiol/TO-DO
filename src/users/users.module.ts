import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AutomapperModule } from "@automapper/nestjs";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AutomapperModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule, TypeOrmModule.forFeature([User])]
})
export class UsersModule {
}
