import { Body, Controller, Post } from '@nestjs/common';
import { SignupAdminDto } from './dto/singup-admins.dto';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admins.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // --> Controller de Admin
    @Post('admin/signup')
    singupAdmin(@Body() signupAdminDto: SignupAdminDto) {
        return this.authService.singupAdmin(signupAdminDto);
    }

    @Post('admin/login')
    loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
        return this.authService.loginAdmin(loginAdminDto)
    }

    // --> Controller de User
    @Post('user/signup')
    registerUser(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registerUser(registerUserDto);
    }

    @Post('user/login')
    loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto);
    }
}
