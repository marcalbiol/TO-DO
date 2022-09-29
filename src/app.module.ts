import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { TaskModule } from "./tasks/task.module";
import { Task } from "./tasks/entities/task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'todo_app',
      entities: [User, Task],
      synchronize: true,
      dropSchema: true,
      autoLoadEntities: true,
      keepConnectionAlive: true
    }), UsersModule, TaskModule, SeedModule, CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){

  }
}
