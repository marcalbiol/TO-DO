import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { AutomapperModule } from "@automapper/nestjs";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AutomapperModule, TypeOrmModule.forFeature([User])],
  controllers: [TaskController],
  providers: [TaskService, UsersService],
  exports: [TaskService, TaskModule] // IMPORTANTE EXPORTAR SERVICE Y MODULE CON EL SEED
})
export class TaskModule {
}
