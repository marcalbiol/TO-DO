import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, ignore, mapFrom, Mapper} from "@automapper/core";
import {User} from "../users/entities/user.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {ReadUserDto, ReadUserNoPwDto} from "../users/dto/read-user.dto";
import {UpdateUserDto} from "../users/dto/update-user.dto";


@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, User, ReadUserDto, forMember((dest) => dest.task, mapFrom(source => source.tasks))); // mappeo para leer
            createMap(mapper, User, ReadUserNoPwDto, forMember((dest) => dest.task, mapFrom(source => source.tasks))); // mappeo para leer
            createMap(mapper, CreateUserDto, User, forMember((dest) => dest.id, ignore())) // ignora el id en el mapping
            createMap(mapper, UpdateUserDto, User, forMember((dest) => dest.id, ignore()));
            // mappeos
        }
    }
}