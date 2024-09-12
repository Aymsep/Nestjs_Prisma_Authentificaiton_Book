import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto{
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

}