export interface IBook {
    bookId: string;
    title: string;
    author: string;
    image: string;
    description: string;
    content: string;
}

export const INITIAL_BOOK_STATE: IBook = {
    bookId: '',
    title: '',
    author: '',
    image: '',
    description: '',
    content: ''
};