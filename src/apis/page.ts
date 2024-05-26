import axios from '@/libs/axios';
import { IApiResponse } from '@/interfaces/api';
import { IBook, IBookUpdateRequest, IPage, IPageAddRequest } from '@/interfaces/book';

export const getPagesByBookId = async (bookId: string, pageNumber: number, pageSize: number): Promise<IApiResponse> => {
    const response = await axios({
        method: 'GET',
        path: `/api/pages/${bookId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    });

    return response;
}

export const addPage = async (bookId: string, page: IPageAddRequest): Promise<IApiResponse> => {
    const response = await axios({
        method: 'POST',
        path: `/api/pages/${bookId}`,
        data: page
    });

    return response;
}

export const getPageByPageId = async (pageId: string): Promise<IApiResponse> => {
    const response = await axios({
        method: 'GET',
        path: `/api/pages/fetch/${pageId}`
    });

    return response;
}

export const updatePageByPageId = async (pageId: string, page: IBookUpdateRequest): Promise<IApiResponse> => {
    const response = await axios({
        method: 'PUT',
        path: `/api/pages/${pageId}`,
        data: page
    });

    return response;
}