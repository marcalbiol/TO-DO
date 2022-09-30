import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, HttpCode, Query } from '@nestjs/common';
import { response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("/:userId")
  @HttpCode(204)
  create(@Body() task: Task, @Res() response, @Param("userId") userId: number) {

    const tasks = this.taskService.create(task, userId)
    return response.status(HttpStatus.OK).json({
      tasks
    });
  }


  @Get("/:id")
  getById(@Param('id') id: number){
    return this.taskService.findOne(id);
  }

  @Delete(':userId/:id')
  remove(@Param('userId') userId: number, @Param('id') id: number, @Res() response) {
    console.log("usuario" + userId + "id" + id);


    return this.taskService.remove(userId, id);
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

  @Put(':id')
  async update(@Param('id') id: number, @Body() cuenta: Cuenta) {
    return await this.taskService.update(id, cuenta)
    
  }
/*
  @Patch('/:id/transferencia/enviar/:value')
  async sendMoney(@Param('id') id:number, @Body() saldo: Cuenta, @Param('value') value: number){
   // saldo.saldo = thi
    return await this.taskService.sendMoney(id, saldo, value);
  }





  @Get(':id/salary')
    async getSalaryById(@Param('id') id: number){
      return await this.taskService.findOneSalary(id)
    
  }
*/
}
