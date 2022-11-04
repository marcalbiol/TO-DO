import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {AutoMap} from "@automapper/classes";

export class CreateUserDto {

    //TODO createDate

    @AutoMap()
    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    username: string;

    @AutoMap()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'password must contain letters and number'})
    password: string;
}
