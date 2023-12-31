import { Request, Response, NextFunction } from 'express';

import { BadRequestError, UnauthorizedError } from '../helpers/error';
import { IUser } from '../infra/db/mongoose/models/User';
import UserService from '../services/userService';
import { UserRepository } from '../infra/repository/userRepository';
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { authorization } = req.headers as { authorization: string };
  const token = authorization?.split(' ')[1];
  if (!token) {
    return next(new BadRequestError('No token provided'));
  }

  try {
    const decoded = (await UserService.verifyToken(token)) as JwtPayload;
    const user = (await UserRepository.findById(decoded.id)) as IUser;
    if (!user) return next(new BadRequestError('User does not exist'));
    user.password = undefined;
    req.user = user;

    next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'));
  }
};
