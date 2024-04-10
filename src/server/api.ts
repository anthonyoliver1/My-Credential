import axios from "axios";
import * as Network from 'expo-network';

const PORT: number = 3333;

type TMethod = 'GET' | 'POST';

export const api = async (method: TMethod = 'POST', endpoint: string, data: any = {}) => {
    const domain = __DEV__ ? '192.168.1.100' : await Network.getIpAddressAsync()

    const url = `${__DEV__ ? 'http://' : 'https://'}${domain}:${PORT}/${endpoint}`;
    let result: any = {};
    
    try {
        const response = await callApi(method, url, data);

        result = response;
    } catch (error) {
        result = { message: 'Houve um erro inesperado!' }
        if (axios.isAxiosError(error)) {
            result = error.response?.data;
        }
    }
    return result
}

const callApi = async (method: TMethod, url: string, data: any = {}) => {
    const headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    }
    const api = {
        'GET': () => axios.get(url, { headers }),
        'POST': () => axios.post(url, data, { headers })
    } as any;

    return await api[method]();
}
