import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    Put,
    HttpCode,
    Query
} from "@nestjs/common";
import {response} from "express";
import {TaskService} from "./task.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {Task} from "./entities/task.entity";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get("/:id")
    getById(@Param("id") id: number) {
        return this.taskService.findOne(id);
    }

    @Post()
    @HttpCode(204)
    async create(@Body() task: CreateTaskDto, @Res() response) {

        const tasks = await this.taskService.create(task);
        return response.status(HttpStatus.OK).json({
            tasks
        });
    }

    @Patch("/:id")
    async update(@Body() task: UpdateTaskDto, @Param("id") id: number){
        return await this.taskService.update(id, task);
    }

    @Delete("/:id")
    remove(@Param("id") id: number, @Res() response) {

        return this.taskService.remove(id);
        //TODO response
    }

    /*
      @Get()
      async fetchAll(@Res() response) {
          const tareas = await this.taskService.findAll();
          return response.status(HttpStatus.OK).json({
              tareas
          })
      }

      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.taskService.findOne(+id);
      }


     */
}


