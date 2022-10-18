// validations

import {AutoMap} from '@automapper/classes';

export class ReadUserDto {

    @AutoMap()
    id?: number;

    @AutoMap()
    username?: string;

}

