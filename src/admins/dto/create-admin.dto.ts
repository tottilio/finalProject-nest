import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAdminDto {
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