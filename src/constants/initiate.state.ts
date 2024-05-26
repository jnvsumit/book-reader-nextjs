import { IBook, IPage } from "@/interfaces/book";

export const INITIAL_BOOK_STATE: IBook = {
    bookId: '',
    title: '',
    author: '',
    image: '',
    description: '',
    pages: []
};

export const INITIAL_PAGE_STATE: IPage = {
    pageId: '',
    title: '',
    bookId: '',
    content: ''
};

export const INITIAL_PAGE_NUMBER = 1;