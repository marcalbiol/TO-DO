// validations

import {AutoMap} from '@automapper/classes';
import {ReadCategoryDto} from "../../category/dto/read-category.dto";
import {Category} from "../../category/entities/category.entity";

export class ReadUserDto {

    @AutoMap()
    id?: number;

    @AutoMap()
    username?: string;

    @AutoMap()
    categories?: Category[];

}

