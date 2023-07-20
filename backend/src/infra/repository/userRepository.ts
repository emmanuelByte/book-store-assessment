// src/infra/repository/userRepository.ts

import mongoose, { UpdateWriteOpResult } from 'mongoose';
import { BadRequestError, CustomError, MongoError } from '../../helpers/error';
import UserModel, { IUser } from '../db/mongoose/models/User';
import { NextFunction } from 'express';

export class UserRepository {
  static async create(user: IUser, next: NextFunction): Promise<IUser | void> {
    try {
      if (await UserModel.findOne({ email: user.email })) {
        throw new BadRequestError('User already exist');
      }
      const newUser = await UserModel.create(user);
      return newUser.toObject() as IUser;
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }

  static async findById(_id: string): Promise<IUser | undefined> {
    try {
      const user = await UserModel.findOne({ _id });
      if (!user) throw new BadRequestError('User does not exist');
      return user.toObject() as IUser;
    } catch (err) {
      if (err instanceof MongoError) throw new BadRequestError(err.message);
    }
  }
  static async findByEmail(email: string): Promise<IUser | undefined> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw new BadRequestError('User does not exist');
      return user.toObject() as IUser;
    } catch (err) {
      if (err instanceof MongoError) throw new BadRequestError(err.message);
    }
  }
  static async update(_id: string, data: Partial<IUser>): Promise<UpdateWriteOpResult | undefined> {
    try {
      await this.findById(_id);
      return await UserModel.updateOne({ _id }, { $set: data });
    } catch (err) {
      //
    }
  }
  static async addBook(_id: string, data: Partial<IUser>): Promise<UpdateWriteOpResult | undefined> {
    try {
      await this.findById(_id);

      return await UserModel.updateOne({ _id }, { $push: data });
    } catch (err) {
      //
    }
  }
  static async getBook(_id: string) {
    try {
      await this.findById(_id);

      const [books] = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: 'books',
            foreignField: '_id',
            as: 'books',
          },
        },
        {
          $project: {
            _id: 0,
            books: 1,
          },
        },
      ]);
      return books;
    } catch (err) {
      //
    }
  }
}
