import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  const books = [
    {
      id: Date.now(),
      title: 'The Electronic Swagman',
      content:
        'He travels in his customised 4-wheel mini-bus with a laptop and mobile internet connection – sleeping under the stars in his swag whenever possible.',
      author: 'Ella .A',
    },
  ];

  const book = {
    id: Date.now(),
    title: 'The Electronic Swagman',
    content:
      'He travels in his customised 4-wheel mini-bus with a laptop and mobile internet connection – sleeping under the stars in his swag whenever possible.',
    author: 'Ella .A',
  };

  const mockBookRepository = {
    save: jest.fn().mockResolvedValue(book),
    find: jest.fn().mockResolvedValue(books),
    findOne: jest.fn().mockResolvedValue(book),
    delete: jest.fn().mockResolvedValue(book),
    update: jest.fn().mockResolvedValue(book),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of books', async () => {
      const data = await service.findAll();
      expect(data).toEqual(books);
    });
  });

  describe('getOne', () => {
    it('should get a single book', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(book);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should successfully insert a book', async () => {
      const repoSpy = jest.spyOn(repo, 'save');
      const result = await service.create(book);

      expect(repoSpy).toHaveBeenCalled();
      expect(repoSpy).toHaveBeenCalledWith(book);

      expect(result).toEqual(book);
    });
  });

  describe('delete', () => {
    it('delete => should find a user by a given id, delete and then return Number of affected rows', async () => {
      const id = 1;

      const repoSpy = jest.spyOn(repo, 'delete');

      const result = await service.remove(id);

      expect(repoSpy).toHaveBeenCalled();
      expect(repoSpy).toHaveBeenCalledWith(id);

      expect(result).toEqual(book);
    });
  });

  describe('update', () => {
    it('should call the update method', async () => {
      const id = 1;
      const repoSpy = jest.spyOn(repo, 'update');
      const result = await service.update(id, book);

      expect(repoSpy).toHaveBeenCalledTimes(1);
      expect(repoSpy).toHaveBeenCalledWith(id, book);

      expect(result).toEqual(book);
    });
  });
});
