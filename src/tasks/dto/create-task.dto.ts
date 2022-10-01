import { IsNumber, IsString } from "class-validator";

export class CreateTaskDto {

  @IsString()
  description: string

  @IsNumber()
  user: number;

}
