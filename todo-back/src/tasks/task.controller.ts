import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res,} from '@nestjs/common';
import {TaskService} from './task.service';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entities/task.entity';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get('/:userId')
    async get(@Param('userId') id: number, @Res() response) {
        let tasks = await this.taskService.findTask(id);
        return response.status(HttpStatus.OK).json({tasks});
    }

    @Post('/create/:userId')
    @HttpCode(204)
    async create(@Body() task: CreateTaskDto, @Res() response, @Param('userId') id: number): Promise<Task> {
        const tasks = await this.taskService.create(task, id);
        return response.status(HttpStatus.OK).json({tasks});
    }


    @Patch('/update/:taskId')
    async update(@Body() task: UpdateTaskDto, @Param('taskId') taskId: number,
                 @Res() response) {
        let taskUpdated = await this.taskService.update(taskId, task);

        if (taskUpdated.affected == 0) {
            return response.status(HttpStatus.NOT_FOUND).json("Tarea no encontrada");
        }
        return response.status(HttpStatus.OK).json("Tarea actualizada");
    }

    @Delete('/delete/:id')
    async remove(@Param('id') id: number, @Res() response) {

        let taskRemoved = await this.taskService.remove(id);

        if (taskRemoved.affected == 0) {
            return response.status(HttpStatus.NOT_FOUND).json("Tarea no encontrada");
        }
        return response.status(HttpStatus.OK).json("Tarea eliminada");
    }

}
