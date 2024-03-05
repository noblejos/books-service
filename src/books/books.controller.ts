import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const newBook = await this.booksService.create(createBookDto);
    return {
      message: 'Books Retrieved Successfully',
      data: newBook,
    };
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    return {
      message: 'Books Retrieved Successfully',
      data: books,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.booksService.findOne(+id);
    return {
      message: 'Book Retrieved Successfully',
      data: book,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const updatedBook = await this.booksService.update(+id, updateBookDto);
    return {
      message: 'Book Updated Successfully',
      data: updatedBook,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedBook = await this.booksService.remove(+id);
    return {
      message: 'Books Deleted Successfully',
      data: deletedBook,
    };
  }
}
