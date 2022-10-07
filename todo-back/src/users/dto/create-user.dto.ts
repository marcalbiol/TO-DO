import { IsInt, IsOptional, IsString } from "class-validator";
import {AutoMap} from "@automapper/classes";

export class CreateUserDto {

  @AutoMap()
  @IsString()
  username: string;

  @AutoMap()
  @IsString()
  password: string;

}
