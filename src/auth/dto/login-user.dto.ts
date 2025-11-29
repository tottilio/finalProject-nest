import { IsEmail, IsString, MaxLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsString()
    @MaxLength(50)
    password: string;
}