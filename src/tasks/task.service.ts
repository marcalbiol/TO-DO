import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository, DataSource } from 'typeorm';
import { UsersService } from "../users/users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class TaskService {

  private task: Task[] = []
  
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private usersService: UsersService,
    private DataSource: DataSource
  ){

  }
  create(task: Task, id): Promise<Task> {

    let userExists = this.usersService.findOneById(id);

    task.user = id;
    return this.taskRepository.save(task)
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }


  async findOne(id: number): Promise<Task> {
    let task: any

    task = await this.taskRepository.findOne({
      where: {
        id: id
      }
    });
    if(!task) throw new NotFoundException("task no encontrada")

    return task;
  }


  async update(id: number, task: UpdateTaskDto) {

    const taskExists = await this.findOne(id)

    let taskUpd: any;

    taskUpd = this.taskRepository.update(id, task)

    return taskUpd;
  }


  async remove(userId: number, id: number) {
    console.log("usuario" + userId + "id" + id);

    let exists = this.usersService.findUser(userId)

    console.log(exists);

    if (exists) {
      console.log("lo borra");

      return this.taskRepository.delete(id);
    }
    console.log("no lo borra");

    throw new NotFoundException("No encontrado")
  }

  fillData(cuenta: Task[]){
    this.taskRepository.save(cuenta)
  }

  private handleError(error: any){
    
    if(error === 1300){
      // codigo thor new... luego se llama al metodo privado dentro del 
      //catch con el parametro del error
    }
  }

}
