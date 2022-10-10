import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpStatus,
    HttpCode,
    Query,
    ParseIntPipe, UseGuards, Put, UseInterceptors
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PaginationDto} from "../common/dto/pagination.dto";
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from "@nestjs/swagger";
import {PassportModule} from "@nestjs/passport";
import {MapInterceptor, MapPipe} from "@automapper/nestjs";
import {User} from "./entities/user.entity";
import {ReadUserDto} from "./dto/read-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    // TODO IMPLEMENT AUTH JSTOKEN
    // TODO CREAR CATEGORIAS
    //@UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Post()
    @HttpCode(200)
    async createClient(@Res() response, @Body(MapPipe(User, CreateUserDto)) user: CreateUserDto) {

        const User = await this.usersService.createUser(user);
        return response.status(HttpStatus.CREATED).json({
            User
        });
    }

    //TODO ValidationPipe

    @Get()
    @UseInterceptors(MapInterceptor(User, ReadUserDto))
    async fetchAll(@Res() response, @Query() paginationDto: PaginationDto) {

        const users = await this.usersService.findAll();
        return response.status(HttpStatus.OK).json({
            users
        });
    }

    @Get("/:id") // by Id
    async findById(@Res() response, @Param("id") value: number) {

        const user = await this.usersService.findOneById(value);
        return response.status(HttpStatus.OK).json({
            user
        });
    }


    @Patch(":id")
    update(@Param("id") id: number, @Body() updateUser: UpdateUserDto) {

        return this.usersService.update(id, updateUser);
    }

    //TODO ENDPOINTS PARA CAMBIAR EL STATUS

    @Delete(":id")
    remove(@Param("id") id: number) {

        return this.usersService.remove(id);
    }
}
