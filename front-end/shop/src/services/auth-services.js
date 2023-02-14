import { authAxois } from "../utils/axios"

// Шляхи для звернення до кінцевих точок серверу
export const authService = {

    async login (data) {
        const response = await authAxois.post('/login', data, {withCredentials: true})
        return response.data 
    },
    async logout () {
        const response = await authAxois.post('/logout', {}, {withCredentials: true})
        return response.data
    },
    async refresh () {
        const response = await authAxois.get('/refresh', { withCredentials: true })
        return response.data
    },
    async adminRegistration (data) {
        console.log(data)
        const response = await authAxois.post('/registration', data, { withCredentials: true })
        return response.data
    }
}