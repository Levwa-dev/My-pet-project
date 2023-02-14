import { commonAxios } from "../../utils/axios"

// Шлях для звернення до кінцевих точок серверу
export const commonCategoryService = {
    async getBoxCategory () {
        const response = await commonAxios.get('/category/box-category')
        return response.data
    }
}