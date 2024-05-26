export interface IPage {
    pageId: string;
    bookId: string;
    title: string;
    content?: string;
}

export interface IBook {
    bookId: string;
    title: string;
    author: string;
    image: string;
    description: string;
    pages: IPage[];
}

export interface IBookUpdateRequest {
    title?: string;
    author?: string;
    image?: string;
    description?: string;
    content?: string;
}

export interface IPageAddRequest {
    title: string;
    content: string;
}

export interface IPageUpdateRequest {
    title?: string;
    content?: string;
}