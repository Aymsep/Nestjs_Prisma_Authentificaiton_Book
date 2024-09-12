import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    // constructor(){
    //     super({
    //         datasources:{
    //             db:{
    //                 url:env("DATABASE_URL")
    //             }
    //         }
    //     });
    // }

    async onModuleInit() {
        await this.$connect()
    }

    // async onModuleDestroy() {
    //     await this.$disconnect()
    // }
}
