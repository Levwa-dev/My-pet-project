import { adminAxios } from "../../utils/axios"

export const userService = {
    async getUsersList(page, params) {
        const response = await adminAxios.get(`/admin/list/${page}`, {params})
        return response.data
    },
    async getUser(id) {
        const response = await adminAxios.get(`/admin/${id}`)
        return response.data
    },
    async deleteUser(id) {
        const response = await adminAxios.delete(`/admin/${id}`)
        return response.data
    },
    async addUser(data) {
        const response = await adminAxios.post('/admin/add', data)
        return response
    },
    async editUser(data, id){
        const response = await adminAxios.put(`/admin/${id}`, data)
        return response
    }
}