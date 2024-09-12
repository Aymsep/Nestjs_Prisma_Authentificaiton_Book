import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [BooksController],
  providers: [
    BooksService,
    JwtService ,
    DatabaseService
  ],
})
export class BooksModule {}
