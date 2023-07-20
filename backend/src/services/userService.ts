import { IUser } from '../infra/db/mongoose/models/User';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import { BadRequestError, CustomError } from '../helpers/error';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../infra/repository/userRepository';

export default class UserService {
  static async registerUser(req: Request, res: Response, next: NextFunction): Promise<IUser | void> {
    try {
      const userData = req.body;
      const unHashPassword = userData.password as string;
      const salt = await bcrypt.genSalt(10);

      const password = await bcrypt.hash(unHashPassword, salt);
      userData.password = password;
      return await UserRepository.create(userData, next);
    } catch (err) {
      if (err instanceof CustomError) {
        throw next(new BadRequestError(err.message));
      }
    }
  }
  static async login(req: Request, res: Response, next: NextFunction): Promise<IUser | undefined> {
    const data: Pick<IUser, 'email' | 'password'> = req.body;
    try {
      const { email, password } = data as { email: string; password: string };
      const user = (await UserRepository.findByEmail(email)) as IUser;
      if (!user) throw new BadRequestError('User does not exist');
      const isPasswordValid = await bcrypt.compare(password, user.password as string);
      if (!isPasswordValid) throw new BadRequestError('Invalid Password');
      return user;
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction): Promise<IUser | undefined> {
    try {
      const user = req.user as IUser;
      return user;
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }

  static async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;
      return await UserRepository.getBook(user._id);
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }

  static async addBook(req: Request, res: Response, next: NextFunction): Promise<IUser | undefined> {
    try {
      const user = req.user as IUser;
      const { bookId } = req.body;
      if (!user.books.includes(bookId)) {
        await UserRepository.addBook(user._id, { books: bookId });
      }
      return user;
    } catch (err) {
      if (err instanceof CustomError) throw next(new BadRequestError(err.message));
    }
  }
  static generateToken(user: IUser): string {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const jwtConfig = config.jwt as { secret: string; expiresIn: string };
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
  static async verifyToken(token: string): Promise<string | JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
      const jwtConfig = config.jwt as { secret: string; expiresIn: string };
      jwt.verify(
        token,
        jwtConfig.secret,
        (err: unknown, decoded: string | JwtPayload | PromiseLike<string | JwtPayload | undefined> | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}
