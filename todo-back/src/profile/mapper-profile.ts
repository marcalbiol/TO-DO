import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, ignore, mapFrom, Mapper} from "@automapper/core";
import {User} from "../users/entities/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {ReadUserDto} from "../users/dto/read-user.dto";
import {ReadTaskDto} from "../tasks/dto/read-task.dto";
import {Task} from "../tasks/entities/task.entity";
import {Category} from "../category/entities/category.entity";
import {ReadCategoryDto} from "../category/dto/read-category.dto";


@Injectable()
export class MapperProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, User, ReadUserDto, forMember((dest) => dest.categories, mapFrom(source => source.categories)));
            createMap(mapper, CreateUserDto, User, forMember((dest) => dest.id, ignore())) // ignora el id en el mapping
            createMap(mapper, UpdateUserDto, User, forMember((dest) => dest.id, ignore()));
            createMap(mapper, Task, ReadTaskDto);
            createMap(mapper, Category, ReadCategoryDto, forMember((dest) => dest.tasks, mapFrom(source => source.tasks)));
        }
    }
}