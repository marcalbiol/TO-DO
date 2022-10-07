// validations

import {AutoMap} from "@automapper/classes";

export class ReadUserDto {

    @AutoMap()
    username: string;

    @AutoMap()
    password: string;

}
