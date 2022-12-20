import { adminAxios } from "../../utils/axios"

export const categoryService = {
    async fetchCategories (page, params) {
        const response = await adminAxios.get(`/category/list/${page}`, {params})
        return response.data
    },
    async fetchCategory (id) {
        const response = await adminAxios.get(`/category/${id}`)
        return response.data
    }
}