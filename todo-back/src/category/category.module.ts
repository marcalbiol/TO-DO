import {Module} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CategoryController} from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "../tasks/entities/task.entity";
import {AutomapperModule} from "@automapper/nestjs";
import {User} from "../users/entities/user.entity";
import {Category} from "./entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Task]), AutomapperModule, TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService, CategoryModule, TypeOrmModule.forFeature([Category])]
})
export class CategoryModule {
}
