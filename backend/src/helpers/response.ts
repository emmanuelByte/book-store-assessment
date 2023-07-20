import { Response } from 'express';
export type responseType = {
  success: boolean;
  message: string;
  data: unknown;
  statusCode: number;
};
export const sendResponse = ({
  message,
  data,
  statusCode = 200,
  res,
}: {
  res: Response;
  statusCode?: number;
  message: string;
  data?: unknown;
}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode,
  });
};
