import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string

    @IsString()
    lastname: string;

    @IsInt()
    phone: number;

    @IsOptional()
    accountNumber: number;
}
