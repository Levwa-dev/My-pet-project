import { commonAxios } from "../../utils/axios"

// Шляхи для звернення до кінцевих точок серверу
export const commonProductService = {
    async showProductOnMain () {
        const response = await commonAxios.get('/product/show-products-on-main')
        return response.data
    },
    async getProduct (id) {
        const response = await commonAxios.get(`/product/${id}`)
        return response.data
    },
    async getProductList (page, category) {
        const response = await commonAxios.get(`/product/list/${page}/${category}`)
        return response.data
    }

}