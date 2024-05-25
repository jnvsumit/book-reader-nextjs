import axios from '@/configs/axios.config';
import { IApiResponse } from '@/interfaces/api';
import { IBook, IBookUpdateRequest } from '@/interfaces/book';

export const saveBook = async (book: IBook): Promise<IApiResponse> => {
    const response = await axios({
        method: 'POST',
        path: '/api/books',
        data: book
    });

    return response;
}

export const getBookByBookId = async (bookId: string): Promise<IApiResponse> => {
    const response = await axios({
        method: 'GET',
        path: `/api/books/${bookId}`
    });

    return response;
}

export const updateBookByBookId = async (bookId: string, book: IBookUpdateRequest): Promise<IApiResponse> => {
    const response = await axios({
        method: 'PUT',
        path: `/api/books/${bookId}`,
        data: book
    });

    return response;
}