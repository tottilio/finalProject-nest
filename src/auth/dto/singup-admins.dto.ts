import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";

export class SignupAdminDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    password: string;
}