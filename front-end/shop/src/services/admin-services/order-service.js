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
        const response = await adminAxios.delete(`/order/delete/${id}`)
        return response.data
    },
    async findProduct (params) {
        const response = await adminAxios.get('/order/find-product/',  {params} )
        return response.data
    },
    async postOrder (data) {
        const response = await adminAxios.post('/order/add', data)
        return response.data
    }

}