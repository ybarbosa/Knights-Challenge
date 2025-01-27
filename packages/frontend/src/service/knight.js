import { api } from './axios'

const PATH = '/knight'
const findAll = async (filter) => {
    const result = await api.get(PATH, {params: { filter }})
    return result.data;
}
const create = async (payload) => {
    const result = await api.post(PATH, payload)
    return result.data
}

export const knightService = {
    findAll,
    create
}