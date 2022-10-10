// validations

import {AutoMap} from "@automapper/classes";
import {Task} from "../../tasks/entities/task.entity";

export class ReadUserDto {

    @AutoMap()
    id?: number;

    @AutoMap()
    username?: string;

    @AutoMap()
    password?: string;

    @AutoMap()
    task?: Task[];

}

export class ReadUserNoPwDto{

    @AutoMap()
    username: string;

    @AutoMap()
    task: Task[];
}
