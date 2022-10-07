import {ReadUserDto} from "./read-user.dto";
import {AutoMap} from "@automapper/classes";

export class UpdateUserDto extends ReadUserDto {

    // TODO cambiar contraseña

    @AutoMap()
    password: string

    //updateDate: Date
}
