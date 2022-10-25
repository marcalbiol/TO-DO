import {Injectable,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UpdateTaskDto} from './dto/update-task.dto';
import {Task} from './entities/task.entity';
import {Repository} from 'typeorm';
import {User} from 'src/users/entities/user.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {ReadTaskDto} from "./dto/read-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectMapper()
        private readonly classMapper: Mapper
    ) {
    }

    async create(task: CreateTaskDto, userId: number): Promise<Task> {
        task.user = userId;
        return await this.taskRepository.save(task);
    }

    async findTask(id: number): Promise<ReadTaskDto[]> {

        //TODO controlar si es null
        return await this.classMapper.mapArrayAsync(await this.taskRepository.find({
            relations: ['user'],
            where: {user: {id: id}},
        }), Task, ReadTaskDto)
    }

    async completeTask(id: number){

        const taskFromDb = await this.taskRepository.findOne({
            where: {id}
        })

        taskFromDb.isDone = taskFromDb.isDone != true;

        return this.taskRepository.save(taskFromDb)
    }

    async update(id: number, task: UpdateTaskDto) {

        return await this.taskRepository.update(id, task);
    }

    async remove(id: number) {

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
