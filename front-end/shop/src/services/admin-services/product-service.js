import { adminAxios } from "../../utils/axios"

export const productService = {
    async fetchProducts (page, params) {
        const response = await adminAxios.get(`/product/list/${page}`, {params})
        return response.data
    },
    async fetchCategories () {
        const response = await adminAxios.get('/product/categories')
        return response.data
    },
    async fetchProduct (id) {
        const response = await adminAxios.get(`/product/${id}`)
        return response.data
    }
}