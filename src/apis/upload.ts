import axios from '@/configs/axios.config';
import { IApiResponse } from '@/interfaces/api';

export const uploadMedia = async (data: FormData): Promise<IApiResponse> => {
    const response = await axios({
        method: 'POST',
        path: '/api/upload',
        data
    });

    return response;
}