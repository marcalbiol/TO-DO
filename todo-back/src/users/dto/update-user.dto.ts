import {ReadUserDto} from "./read-user.dto";
import {AutoMap} from "@automapper/classes";

export class UpdateUserDto {

    // TODO cambiar contraseña
    readonly id?: number;

    password: string

    //updateDate: Date
}
