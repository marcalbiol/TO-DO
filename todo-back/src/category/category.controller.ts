import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {Category} from "./entities/category.entity";
import {CreateTaskDto} from "../tasks/dto/create-task.dto";
import {Task} from "../tasks/entities/task.entity";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }


    @Get("/:id")
    async getTasks(@Param("id") id: number, @Res() response) {

        const categoryWithTasks = await this.categoryService.findOneById(id);
        return response.status(HttpStatus.OK).json({
            categoryWithTasks,
        });
    }

    @Post("/create/:userId")
    async create(@Body() category: CreateCategoryDto, @Param('userId') id: number,
                 @Res() response): Promise<Category> {
        await this.categoryService.create(category, id);
        return response.status(HttpStatus.OK).json("Categoria Creada");
    }


    @Post('/create/task/:id')
    async createTask(@Body() task: CreateTaskDto, @Param('id') id: number,
                     @Res() response): Promise<Task> {
        const newCategory = await this.categoryService.newTask(task, id);

        if (newCategory) return response.status(HttpStatus.OK).json("Tarea creada");

        return response.status(HttpStatus.BAD_REQUEST).json("No se ha creado la tarea");
    }


    @Put(':categoryId')
    update(@Param('categoryId') categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(categoryId, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number, @Res() res) {

        return this.categoryService.remove(id)
        // response
    }


}
