import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {User} from "../users/entities/user.entity";
import {UserDto} from "../users/dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";


@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(){
        return (mapper) => {
            createMap(mapper, User, UserDto);
            createMap(mapper, User, CreateUserDto)
            // mappeos
        }
    }
}