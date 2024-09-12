import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RfStratJwt extends PassportStrategy(Strategy,'jwt-refresh') {
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:jwtConstants.secret_rf,
            passReqToCallback:true
        })
    }
    async validate(req:Request, payload: any) {
        const refresh_token = req.get('authorization').replace('Bearer',"").trim()
        return {
            ...payload,
            refresh_token
        }
      }
}