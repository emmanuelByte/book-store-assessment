import { NextFunction, Request, Response } from 'express';

import { sendResponse } from '../helpers/response';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, CustomError } from '../helpers/error';
import AuthorService from '../services/authorService';
class AuthorController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const author = await AuthorService.createAuthor(req, res, next);
      if (author)
        return sendResponse({
          res,
          statusCode: StatusCodes.CREATED,
          message: 'Author created successfully',
          data: author,
        });
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
  static async getAuthor(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const author = await AuthorService.getAuthor(req, res, next);
      console.log({ author });
      if (author)
        return sendResponse({
          res,
          statusCode: StatusCodes.OK,
          message: 'Author fetched successfully',
          data: author,
        });
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }
}
export default AuthorController;
