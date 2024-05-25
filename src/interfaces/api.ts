export interface IApiResponseError {
    errorCode: string;
    message: string;
}

export interface IApiResponse {
    success: boolean;
    error?: IApiResponseError;
    message: string;
    data?: any;
}

export interface IApiRequest {
    method: string;
    path: string;
    data?: any;
}