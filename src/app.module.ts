import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, DatabaseModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
