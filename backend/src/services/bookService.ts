import { BadRequestError, CustomError } from '../helpers/error';
import { NextFunction, Request, Response } from 'express';
import { IBook } from '../infra/db/mongoose/models/Book';
import { BookRepository } from '../infra/repository/bookRepository';
import { sendResponse } from '../helpers/response';

export default class BookService {
  static async addBook(req: Request, res: Response, next: NextFunction): Promise<IBook | void> {
    try {
      const bookData = req.body as IBook;

      const book = await BookRepository.create(bookData, next);

      return book;
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }
  static async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await BookRepository.findAll();
      sendResponse({ res, message: 'Books fetched successfully', data: books });
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }
  static async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.params;
      const book = await BookRepository.findById(bookId);
      sendResponse({ res, message: 'Book fetched successfully', data: book });
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }
  static async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.params;
      const updateData = req.body;
      await BookRepository.findById(bookId);
      await BookRepository.update(bookId, updateData);
      sendResponse({ res, message: 'Book updated successfully' });
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }
  static async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.params;
      await BookRepository.findById(bookId);
      await BookRepository.delete(bookId);
      sendResponse({ res, message: 'Book deleted successfully' });
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }
}
