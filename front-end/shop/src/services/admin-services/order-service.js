import { adminAxios } from "../../utils/axios";

export const orderServices = {
    async fetchOrders(page, params) {
        const response = await adminAxios.get(`/order/list/${page}`, {params})
        return response.data
    },
    async fetchOrder(id) {
        const response = await adminAxios.get(`/order/${id}`)
        return response.data
    },
    async deleteOrder(id) {
        const response = await adminAxios.delete(`/order/${id}`)
        return response.data
    }

}