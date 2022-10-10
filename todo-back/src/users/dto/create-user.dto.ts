import { IsInt, IsOptional, IsString } from "class-validator";
import {AutoMap} from "@automapper/classes";

export class CreateUserDto {

  //TODO createDate

  @AutoMap()
  @IsString()
  username: string;

  @AutoMap()
  @IsString()
  password: string;

}
