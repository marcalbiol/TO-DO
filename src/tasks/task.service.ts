import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Repository, DataSource } from "typeorm";
import { UsersService } from "../users/users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class TaskService {

  private task: Task[] = [];

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private DataSource: DataSource
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
    return this.taskRepository.find();
  }


  async findOne(id: number): Promise<Task> {
    let task: any;

    task = await this.taskRepository.findOne({
      where: {
        id: id
      }
    });
    if (!task) throw new NotFoundException("task no encontrada");

    return task;
  }


  async update(id: number, task: UpdateTaskDto) {

    const taskExists = await this.findOne(id);

    let taskUpd: any;

    taskUpd = this.taskRepository.update(id, task);

    return taskUpd;
  }


  async remove(id: number) {

    //FIXME
    return await this.taskRepository.delete(id);
  }

  fillData(cuenta: Task[]) {
    this.taskRepository.save(cuenta);
  }

  private handleError(error: any) {

    if (error === 1300) {
      // codigo thor new... luego se llama al metodo privado dentro del 
      //catch con el parametro del error
    }
  }

}