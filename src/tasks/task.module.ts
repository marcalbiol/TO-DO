import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AutomapperModule } from '@automapper/nestjs';
import { UsersModule } from "../users/users.module";
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AutomapperModule, UsersModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService, TaskModule] // IMPORTANTE EXPORTAR SERVICE Y MODULE CON EL SEED
})
export class TaskModule {}
