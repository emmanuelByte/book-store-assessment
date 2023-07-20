import { NextFunction, Request, Response } from 'express';
import { BadRequestError, CustomError } from '../helpers/error';
import BookService from '../services/bookService';
import { sendResponse } from '../helpers/response';
import { StatusCodes } from 'http-status-codes';
class BookController {
  static async addBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await BookService.addBook(req, res, next);

      return sendResponse({
        res,
        statusCode: StatusCodes.CREATED,
        message: 'Book Created successfully',
        data: book,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }

  static async getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
      return await BookService.getBooks(req, res, next);
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
  static async getSingleBooks(req: Request, res: Response, next: NextFunction) {
    try {
      return await BookService.getBookById(req, res, next);
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
  static async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      return await BookService.updateBook(req, res, next);
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
  static async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      return await BookService.deleteBook(req, res, next);
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
}
export default BookController;
