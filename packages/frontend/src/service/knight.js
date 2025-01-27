import { api } from './axios'

const PATH = '/knight'
const findAll = async (filter) => {
    try {
        const result = await api.get(PATH, {params: { filter }})
        return { data: result.data, isError: false };
    } catch({ response: { data } }) {
        return { data: data.message, isError: true };
    }
}

const findById = async (id) => {
    try {
        const result = await api.get(`${PATH}/${id}`);
        return { data: result.data, isError: false };
    } catch ({ response: { data } }) {
        return { data: data.message, isError: true };
    }
}
    

const remove = async (id) => {
    try {
        const result = await api.delete(`${PATH}/${id}`)
        return { data: result.data, isError: false };
    } catch ({ response: { data } }) {
        return { data: data.message, isError: true };
    }
}

const update = async ({ id, nickName }) => {
    try {
        const result = await api.patch(`${PATH}/${id}`, { nickName })
        return { data: result.data, isError: false };
    } catch ({ response: { data } }) {
        return { data: data.message, isError: true }; 
    }
}

const create = async (payload) => {
    try {
        const result = await api.post(PATH, payload)
        return { data: result.data, isError: false };
    } catch ({ response: { data } }) {
        return { data: data.message, isError: true };
    }
}

export const knightService = {
    findAll,
    create,
    findById,
    remove,
    update
}