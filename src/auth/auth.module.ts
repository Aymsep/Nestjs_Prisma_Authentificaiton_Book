import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { PasswordService } from 'src/Utils/password/password.service';
import { AtStratJwt, RfStratJwt } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    AtStratJwt,
    RfStratJwt
  ],
  imports:[
    DatabaseModule,
    JwtModule.register({})
  ]  
})
export class AuthModule {}
