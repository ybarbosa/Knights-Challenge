import { api } from './axios'

const PATH = '/weapon'
const findAll = async () => {
    const result = await api.get(PATH)
    return result.data;
}


export const weaponService = {
    findAll
}