/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosResponse } from "axios";

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
  data: dataType | dataType[];
}
export interface dataType {
  _id: string;
  title: string;
  category: string;
  author: string;
  description: string;
  image: string;
}
export async function getBooks(): Promise<ErrorResponse | SuccessResponse> {
  try {
    const res: AxiosResponse<SuccessResponse> = await axios.get(
      `${host}/api/books`
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
export async function getBook(
  id: string
): Promise<ErrorResponse | SuccessResponse> {
  try {
    const res: AxiosResponse<SuccessResponse> = await axios.get(
      `${host}/api/books/${id}`
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

export async function addBookAPI({
  title,
  category,
  description,
  author,
  token,
}: {
  title: string;
  category: string;
  description: string;
  author: string;
  token: string;
}) {
  try {
    const config = {
      method: "post",

      url: `${host}/api/books`,

      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        title,
        category,
        description,
        author,
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
