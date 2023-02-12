import { adminAxios } from "../../utils/axios";

export const callBackService = {
    async getCallbackList(page, params) {
        const response = await adminAxios.get(`/callBack/list/${page}`, {params})
        return response.data
    },
    async getCallback (id) {
        const response = await adminAxios.get(`/callBack/${id}`)
        return response.data
    },
    async deleteCallBack(id) {
        const response = await adminAxios.delete(`/callback/${id}`)
        return response.data
    }
}