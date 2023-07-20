// src/infra/repository/userRepository.ts

import { UpdateWriteOpResult } from 'mongoose';
import { BadRequestError, CustomError, MongoError } from '../../helpers/error';

import { NextFunction } from 'express';
import Book, { IBook } from '../db/mongoose/models/Book';

export class BookRepository {
  static async create(book: IBook, next: NextFunction): Promise<IBook | void> {
    try {
      const newBook = await Book.create(book);

      return newBook.toObject() as IBook;
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }

  static async findAll(): Promise<IBook[] | undefined> {
    try {
      const books = await Book.find({});
      if (!books) throw new BadRequestError('Book does not exist');
      return books;
    } catch (err) {
      if (err instanceof MongoError) throw new BadRequestError(err.message);
    }
  }

  static async findById(_id: string): Promise<IBook | undefined> {
    try {
      const book = await Book.findOne({ _id });
      if (!book) throw new BadRequestError('Book does not exist');
      return book.toObject() as IBook;
    } catch (err) {
      if (err instanceof MongoError) throw new BadRequestError(err.message);
    }
  }
  static async update(_id: string, data: Partial<IBook>): Promise<UpdateWriteOpResult | undefined> {
    try {
      await this.findById(_id);
      return await Book.updateOne({ _id }, { $set: data }, { new: true });
    } catch (err) {
      //
    }
  }

  static async delete(_id: string): Promise<unknown | undefined> {
    try {
      await this.findById(_id);
      return await Book.deleteOne({ _id });
    } catch (err) {
      //
    }
  }
}
