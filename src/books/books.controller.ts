import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Req() req: Request,@Body() book:CreateBookDto) {
    const user = req['user']
    console.log('user',user)
    return this.booksService.create(user['sub'], book);
  }

  @Get('mybooks')
  findAll(@Req() req: Request) {
    const user = req['user']
    return this.booksService.findAll(user['sub']);
  }


  @Post('share/:bookid')
  async shareBook(
    @Req() req: Request,
    @Param('bookid') bookid:number,
    @Body() data:number
    ){
      const user = req['user']
      return this.booksService.shareBook(user['sub'],+bookid,data['recId'])
    }



    @Get('shareme')
    async shareMe(@Req() req: Request){
      const user = req['user']
      return await this.booksService.getBooksSharedWithUser(user['sub'])
    }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
