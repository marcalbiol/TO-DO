import {AutoMap} from "@automapper/classes";
import {Task} from "../../tasks/entities/task.entity";

export class ReadCategoryDto {

    @AutoMap()
    readonly id: number;

    @AutoMap()
    readonly name: string;

    @AutoMap()
    readonly tasks: Task[]
}