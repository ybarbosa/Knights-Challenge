import { api } from './axios'

const path = '/knight'
const findAll = async (filter) => {
    const result = await api.get(path, {params: { filter }})
    return result;
}


export const knightService = {
    findAll
}