import { commonAxios } from "../../utils/axios"

export const commonCategoryService = {
    async getBoxCategory () {
        const response = await commonAxios.get('/category/box-category')
        return response.data
    }
}