import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({})
  author: string;
}
