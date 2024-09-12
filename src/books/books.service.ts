import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly databaseService: DatabaseService
  ){}
  async create(userId:number,book: CreateBookDto) {
    await this.databaseService.book.create({
      data:{
        bookname:book.bookname,
        year:book.year,
        authorId:userId
      }
    })
    return 'Book Created successfully'
  }

  async findAll(userId:number) {
    return await this.databaseService.book.findMany({
      where:{
        authorId:userId
      }
    })
  }

  async shareBook(userId: number, bookId: number, recipientId: number) {
    // 1. Verify that the book belongs to the user
    const book = await this.databaseService.book.findUnique({
      where: { id: bookId },
    });
    console.log('book',book)

    if (!book || book.authorId !== userId) {
      throw new ForbiddenException('You can only share books you own');
    }
    const alreadyShared = await this.databaseService.bookShares.findFirst({
      where:{
        bookId,
        recipientId
      }
    })

    console.log('aj',alreadyShared)

    if(alreadyShared){
      throw new ForbiddenException('cannot share same book twice with same user')
    } 

    // 2. Create an entry in the BookShares table to share the book
    await this.databaseService.bookShares.create({
      data: {
        bookId,
        recipientId,
      },
    });

    return 'Book shared successfully';
  }

  async getBooksSharedWithUser(userId: number) {
    return this.databaseService.bookShares.findMany({
      where: {
        recipientId: userId,
      },
      include: {
        book: true, // Include book details
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
