export interface IBook {
    bookId: string;
    title: string;
    author: string;
    image: string;
    description: string;
    content: string;
}

export interface IBookUpdateRequest {
    title?: string;
    author?: string;
    image?: string;
    description?: string;
    content?: string;
}