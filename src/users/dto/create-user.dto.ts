import { IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    name:string

    @IsString()
    @MaxLength(100)
    lastname:string
    
    @IsString()
    @MaxLength(50)
    email:string

    @IsString()
    @MaxLength(50)
    password:string
}