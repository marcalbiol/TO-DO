import {ReadUserDto} from "./read-user.dto";
import {AutoMap} from "@automapper/classes";

export class UpdateUserDto {
    //TODO automap con la entidad y actualizar fecha

    password: string

    isActive: boolean

    //updateDate: Date
}
