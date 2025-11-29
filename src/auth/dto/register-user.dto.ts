import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterUserDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(100)
  lastname: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}