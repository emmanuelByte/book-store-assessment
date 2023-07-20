// src/infra/repository/userRepository.ts

import mongoose from 'mongoose';
import { BadRequestError, CustomError, MongoError } from '../../helpers/error';
import Author, { IAuthor } from '../db/mongoose/models/Author';
import { NextFunction } from 'express';

export class AuthorRepository {
  static async create(author: IAuthor, next: NextFunction): Promise<IAuthor | void> {
    try {
      if (await Author.findOne({ user: author.user })) {
        throw new BadRequestError('Author already exist');
      }
      const newUser = await Author.create(author);
      return newUser.toObject() as IAuthor;
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }

  static async findById(_id: string) {
    try {
      const author = await Author.findOne({ user: _id });
      if (!author) throw new BadRequestError('Author does not exist');
      const [authorAggr] = await Author.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(author._id),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
      ]);
      return authorAggr;
    } catch (err) {
      if (err instanceof MongoError) throw new BadRequestError(err.message);
    }
  }
}
