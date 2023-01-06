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
    },
    async editProduct (id, data) {
        const response = await adminAxios.put(`/product/${id}`, data, {headers: { "Content-type": "multipart/form-date" }})
        return response.data
    },
    async postProduct (data) {       
        const response = await adminAxios.post(`/product/add`, data, {headers: { "Content-type": "multipart/form-date" }})
        return response
    },
    async deleteProduct (id) {
        const response = await adminAxios.delete(`/product/${id}`)
        return response.data
    },
    async uploadPhotos (id, data) {
        const response = await adminAxios.post(`/product/upload-photos/${id}`, data, {headers: { "Content-type": "multipart/form-date" }})
        return response.data
    }
}