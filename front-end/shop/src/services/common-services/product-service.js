import { commonAxios } from "../../utils/axios"

export const commonProductService = {
    async showProductOnMain () {
        const response = await commonAxios.get('/product/show-products-on-main')
        return response.data
    }

}