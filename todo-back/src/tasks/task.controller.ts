import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res,} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entities/task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Post('/:userId')
    @HttpCode(204)
    async create(@Body() task: CreateTaskDto, @Res() response, @Param('userId') id: number): Promise<Task> {
        const tasks = await this.taskService.create(task, id);
        return response.status(HttpStatus.OK).json({tasks});
    }

    @Patch('/:id')
    async update(@Body() task: UpdateTaskDto, @Param('id') id: number) {
        //TODO cambiar response
        return await this.taskService.update(id, task);
    }

    @Delete('/:id')
    remove(@Param('id') id: number, @Res() response) {
        return this.taskService.remove(id);
        //TODO response
    }

    @Get('/:userId')
    async get(@Param('userId') id: number, @Res() response) {
        let tasks = await this.taskService.findTask(id);
        return response.status(HttpStatus.OK).json({tasks});
    }
}
