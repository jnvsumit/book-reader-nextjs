import { config } from '@/constants/server.config';
import axios from 'axios';
import { IApiRequest, IApiResponse, IApiResponseError } from '@/interfaces/api';

const fetch = async ({ method, path, data }: IApiRequest): Promise<IApiResponse> => {
    try {
        const response = await axios({
            method,
            url: config.SERVER_BASE_URL + path,
            data
        });

        if (response.data.error) {
            const e: IApiResponseError = {
                errorCode: response.data.error.errorCode,
                message: response.data.error.message,
            };

            return {
                success: false,
                message: e.message,
                error: e
            }
        }

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (error) {
        const e = handleError(error);

        return {
            success: false,
            error: e,
            message: e.message
        }
    }
}

const handleError = (error: any): IApiResponseError => {
    if (axios.isAxiosError(error)) {
        return {
            errorCode: error.response?.data?.error?.errorCode || 'UNKNOWN_ERROR',
            message: error.response?.data?.error?.message || 'An unexpected error occurred'
        };
    }

    return {
        errorCode: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
    };
};

export default fetch;
