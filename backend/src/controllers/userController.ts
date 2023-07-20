import { NextFunction, Request, Response } from 'express';
import { IUser } from '../infra/db/mongoose/models/User';
import { sendResponse } from '../helpers/response';
import UserService from '../services/userService';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, CustomError } from '../helpers/error';
class UserController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const user = await UserService.registerUser(req, res, next);
      if (user)
        return sendResponse({
          res,
          statusCode: StatusCodes.CREATED,
          message: 'User registered successfully',
          data: user,
        });
    } catch (error) {
      if (error instanceof CustomError) {
        return next(new BadRequestError(error.message));
      }
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = (await UserService.login(req, res, next)) as IUser;

      const token = UserService.generateToken(user);
      return sendResponse({
        res,
        statusCode: StatusCodes.OK,
        message: 'User logged in successfully',
        data: { token, ...user, password: undefined },
      });
    } catch (error) {
      // console.log(error);
    }
  }
  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await UserService.getProfile(req, res, next);
      return sendResponse({
        res,
        statusCode: StatusCodes.OK,
        message: 'User profile fetched',
        data: user,
      });
    } catch (error) {
      // console.log(error);
    }
  }

  static async addBook(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await UserService.addBook(req, res, next);
      return sendResponse({
        res,
        statusCode: StatusCodes.OK,
        message: 'Book Added to user ',
        data: user,
      });
    } catch (error) {
      // console.log(error);
    }
  }
  static async getBooks(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const user = await UserService.getBooks(req, res, next);
      return sendResponse({
        res,
        statusCode: StatusCodes.OK,
        message: 'Books fetched',
        data: user,
      });
    } catch (error) {
      // console.log(error);
    }
  }
}
export default UserController;
