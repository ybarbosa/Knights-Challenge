import { api } from './axios'

const PATH = '/weapon'
const findAll = async () => {
    try {
        const result = await api.get(PATH)
        return  { data: result.data, isError: false };
    } catch({ response: { data } }) {
        return { data: data.message, isError: true };
    }
}


export const weaponService = {
    findAll
}