import axios from '@/libs/axios';
import { IApiResponse } from '@/interfaces/api';
import { config } from '@/configs/server.config';

export const uploadMedia = async (data: FormData): Promise<IApiResponse> => {
    const response = await axios({
        method: 'POST',
        path: '/api/upload',
        data
    });

    if (response.data?.url) {
        response.data.url = config.SERVER_BASE_URL + response.data.url;
    }

    return response;
}