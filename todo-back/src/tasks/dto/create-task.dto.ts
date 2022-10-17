import {IsString} from 'class-validator';
import {Task} from "../entities/task.entity";

export class CreateTaskDto extends Task {

    @IsString()
    description: string;

}
