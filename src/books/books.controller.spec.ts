import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  // const books = [
  //   {
  //     id: Date.now(),
  //     title: 'The Electronic Swagman',
  //     content:
  //       'He travels in his customised 4-wheel mini-bus with a laptop and mobile internet connection – sleeping under the stars in his swag whenever possible.',
  //     author: 'Ella .A',
  //   },
  // ];

  // const book = {
  //   id: Date.now(),
  //   title: 'The Electronic Swagman',
  //   content:
  //     'He travels in his customised 4-wheel mini-bus with a laptop and mobile internet connection – sleeping under the stars in his swag whenever possible.',
  //   author: 'Ella .A',
  // };

  // const mockBookRepository = {
  //   save: jest.fn().mockResolvedValue(book),
  //   findAll: jest.fn().mockResolvedValue(books),
  //   findOne: jest.fn().mockResolvedValue(book),
  //   delete: jest.fn().mockResolvedValue(book),
  //   update: jest.fn().mockResolvedValue(book),
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
