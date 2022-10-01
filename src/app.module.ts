import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { SeedModule } from "./seed/seed.module";
import { CommonModule } from "./common/common.module";
import { TaskModule } from "./tasks/task.module";
import { Task } from "./tasks/entities/task.entity";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: 33060,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Task],
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
      keepConnectionAlive: true
    }), UsersModule, TaskModule, SeedModule, CommonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() {
  }
}