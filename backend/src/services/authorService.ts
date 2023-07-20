import { BadRequestError, CustomError } from '../helpers/error';
import { NextFunction, Request, Response } from 'express';

import { AuthorRepository } from '../infra/repository/authorRepository';

export default class AuthorService {
  static async createAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const authorData = req.body;
      const { user } = req;
      authorData.user = user?._id;
      return await AuthorRepository.create(authorData, next);
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }
  static async getAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      const author = await AuthorRepository.findById(user?._id);
      if (!author) throw new BadRequestError('Author does not exist');

      return author;
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }
}
