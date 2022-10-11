import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {

  }

  async create(task: CreateTaskDto): Promise<Task> {

    let userId = task.user;
    let user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!user) throw new BadRequestException("Este usuario no existe");

    return this.taskRepository.save(task);

  }

  findAll(): Promise<Task[]> {
    //TODO mostrar user con todas las tasks asociadas
    return this.taskRepository.find();
  }


  async findOne(id: number): Promise<Task> {
    let task: any;
    //TODO DTOS TASK
    //TODO CREAR METODO
    task = await this.taskRepository.findOne({
      where: {
        id: id
      },
      relations: ['user']
    });
    if (!task) throw new NotFoundException("task no encontrada");

    return task;
  }


  async update(id: number, task: UpdateTaskDto) {

    let taskExists: any;
    taskExists = await this.taskRepository.findOne({
      where: {
        id: id
      }
    });
    if (!taskExists) throw new NotFoundException("task no encontrada");
    return await this.taskRepository.update(id, task);

  }


  async remove(id: number) {

    //FIXME funciona pero se queda colgado el postman
    return await this.taskRepository.delete(id);
  }

  fillData(cuenta: Task[]) {
    this.taskRepository.save(cuenta);
  }

  //TODO
  private handleError(error: any) {

    if (error === 1300) {
      // codigo thor new... luego se llama al metodo privado dentro del
      //catch con el parametro del error
    }
  }

}
