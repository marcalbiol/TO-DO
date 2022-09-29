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
  ParseIntPipe
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { PaginationDto } from "../common/dto/pagination.dto";

@Controller("users")
export class UsersController {


  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @HttpCode(200)
  async createClient(@Res() response, @Body() user: CreateUserDto) {
    const User = await this.usersService.createCliente(user);
    return response.status(HttpStatus.CREATED).json({
      User
    });

  }

  @Get()
  async fetchAll(@Res() response, @Query() paginationDto: PaginationDto) {

    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      users
    });
  }

  @Get("/:value") // by Id
  async findById(@Res() response, @Param("value") value: any) {
    const user = await this.usersService.findOneById(value);
    return response.status(HttpStatus.OK).json({
      user
    });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClienteDto: UpdateUserDto) {
    return this.usersService.update(+id, updateClienteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
