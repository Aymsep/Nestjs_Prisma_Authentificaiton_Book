import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('local/signin')
    signInLocal(@Body() user:AuthLoginDto):Promise<Tokens>{
        return this.authService.signInLocal(user)
    }

    @Post('local/signup')
    signUpLocal(@Body() user:AuthDto):Promise<Tokens>{
        return this.authService.signUpLocal(user)

    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req:Request){
        const user = req.user['sub']
        return this.authService.logout(user)

    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req:Request){
        const user = req.user
        return this.authService.refreshToken(user['sub'],user['refresh_token'])

    }


    @UseGuards(JwtAuthGuard)
    @Get('dashboard')
    getDashboard(@Req() req: Request) {
        // The user information is available on the request object
        const user = req.user;
        return `Hello, ${user['name']}`;
      }



}
