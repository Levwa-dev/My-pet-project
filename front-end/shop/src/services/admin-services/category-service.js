import { adminAxios } from "../../utils/axios"

export const categoryService = {
    async fetchCategories (page, params) {
        const response = await adminAxios.get(`/category/list/${page}`, {params})
        return response.data
    },
    async fetchCategory (id) {
        const response = await adminAxios.get(`/category/${id}`)
        return response.data
    },
    async addCategory (data) {
        return await adminAxios.post('/category/add', data)
    },
    async editCategory (id, data) {
        return await adminAxios.put(`/category/${id}`, data)
    },
    async deleteCategory (id) {
        const response = await adminAxios.delete(`/category/${id}`)
        return response.data
    }
}