import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AtStratJwt extends PassportStrategy(Strategy,'jwt') {
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.secret_ac
        })
    }
    async validate(payload: any) {
        return payload
      }
}