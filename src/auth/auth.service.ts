import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto, AuthLoginDto } from './dto';
import { PasswordService } from 'src/Utils/password/password.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
        )
        {}




    
    async signUpLocal(user:AuthDto):Promise<Tokens>{
        const hash = await this.passwordService.hashPassword(user.password);
        const user_create = await this.databaseService.user.create({
            data:{
                name: user.name,
                email:user.email,
                hash,
            }
        })
        const tokens = await this.getTokens(user_create.id,user_create.email,user_create.name)
        await this.RtHash(user_create.id,tokens.refresh_token)
        return {
            ...tokens,
        }
    }

    async signInLocal(user:AuthLoginDto):Promise<Tokens>{
        const userUnique = await this.databaseService.user.findUnique({
            where:{
                email:user.email
            }
        })
        if(!userUnique) throw new ForbiddenException('Access Denied')
        const passwordMatched = await this.passwordService.comparePasswords(user.password,userUnique.hash)
        if(!passwordMatched) throw new ForbiddenException('Access Denied')
        const tokens = await this.getTokens(userUnique.id,userUnique.email,userUnique.name)
        await this.databaseService.user.update({
            where:{
                id:userUnique.id,
            },
            data:{
                hashedRt:tokens.refresh_token
            }
        })
        return tokens

    }

    async logout(userId:number){
        await this.databaseService.user.updateMany({
            where:{
                id:userId,
                hashedRt:{
                    not:null
                }
            },
            data:{
                hashedRt:null
            }
        })
    }

    async refreshToken(userId:number,rt:string){
        const user = await this.databaseService.user.findUnique({
            where:{
                id:userId,
            }
        })
        if(!user) throw new ForbiddenException('Access Denied')
        const rMatch = await this.jwtService.verifyAsync(rt,{
    secret:jwtConstants.secret_rf
    })
        if(!rMatch) throw new ForbiddenException('Access Denied token not matched')
        const tokens = await this.getTokens(user.id,user.email,user.name)
        await this.RtHash(user.id,tokens.refresh_token)
        return tokens

    }




    
    async getTokens(userId:number,email:string,name:string):Promise<Tokens>{
        const [access_token,refresh_token]  = ([
            await this.jwtService.signAsync({
                sub:userId,
                email,
                name
            },{
                expiresIn:jwtConstants.expiration_time,
                secret:jwtConstants.secret_ac
            }
            ),
            await this.jwtService.signAsync({
                sub:userId,
                email,
                name
            },{
                expiresIn:jwtConstants.expiration_time,
                secret:jwtConstants.secret_rf
            }
            )
        ])
        return{
            access_token,
            refresh_token
        }
        
        
    }

    async RtHash(userId:number,rt:string){
        const hash = await this.databaseService.user.update({
            where:{
                id:userId,
            },
            data:{
                hashedRt:rt
            }
        })

    }
}
