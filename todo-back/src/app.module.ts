import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UsersModule} from "./users/users.module";
import {User} from "./users/entities/user.entity";
import {SeedModule} from "./seed/seed.module";
import {CommonModule} from "./common/common.module";
import {TaskModule} from "./tasks/task.module";
import {Task} from "./tasks/entities/task.entity";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {AutomapperModule} from "@automapper/nestjs";
import {classes} from "@automapper/classes";
import { CategoryModule } from './category/category.module';
import {Category} from "./category/entities/category.entity";


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "rootroot",
            database: "todo_app",
            entities: [User, Task, Category],
            synchronize: true,
            dropSchema: true,
            autoLoadEntities: true,
            keepConnectionAlive: true

        }), UsersModule, TaskModule, SeedModule, CommonModule, AuthModule,
        AutomapperModule.forRoot({
            strategyInitializer: classes()
        }),
        CategoryModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor() {
    }
}

/*
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
    type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "rootroot",
            database: "todo_app",
            entities: [User, Task, Category],
            synchronize: true,
            dropSchema: true,
            autoLoadEntities: true,
            keepConnectionAlive: true
 */
