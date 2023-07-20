/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from "axios";

interface LoginParams {
  email: string;
  password: string;
}
interface RegisterParams extends LoginParams {
  firstName: string;
  lastName: string;
}
const host = import.meta.env.VITE_API as string;

export interface ErrorResponse {
  message: string;
  statusCode: number;
  success: boolean;
}
export interface SuccessResponse {
  message: string;
  statusCode: number;
  success: boolean;
  data: unknown;
}
export async function loginAPI({
  email,
  password,
}: LoginParams): Promise<ErrorResponse | SuccessResponse> {
  try {
    const res: AxiosResponse<SuccessResponse> = await axios.post(
      `${host}/api/users/login`,
      {
        email,
        password,
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }

    return {
      message: "Something went wrong",
      statusCode: 500,
      success: false,
    };
  }
}
export async function registerAPI({
  email,
  password,
  firstName,
  lastName,
}: RegisterParams): Promise<ErrorResponse | SuccessResponse> {
  try {
    const res: AxiosResponse<SuccessResponse> = await axios.post(
      `${host}/api/users/register`,
      {
        email,
        password,
        firstName,
        lastName,
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }

    return {
      message: "Something went wrong",
      statusCode: 500,
      success: false,
    };
  }
}
export async function getCartAPI({
  token,
}: {
  token: string;
}): Promise<ErrorResponse | SuccessResponse> {
  try {
    const config = {
      method: "get",

      url: `${host}/api/users/book`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res: AxiosResponse<SuccessResponse> = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }

    return {
      message: "Something went wrong",
      statusCode: 500,
      success: false,
    };
  }
}
export async function addCartAPI({
  token,
  bookId,
}: {
  token: string;
  bookId: string;
}): Promise<ErrorResponse | SuccessResponse> {
  try {
    const config = {
      method: "post",

      url: `${host}/api/users/book`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        bookId,
      },
    };
    const res: AxiosResponse<SuccessResponse> = await axios.request(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as ErrorResponse;
    }

    return {
      message: "Something went wrong",
      statusCode: 500,
      success: false,
    };
  }
}
