import axios from 'axios'

const backHost = process.env.REACT_APP_BACK_END_HOST

export const authService = {

    async login (data) {
        const response = await axios.post(backHost + '/auth/login', data, {withCredentials: true})
        return response.data 
    },
    async logout () {
        const response = await axios.post(backHost + '/auth/logout', {}, {withCredentials: true})
        return response.data
    },
    async refresh () {
        const response = await axios.get(backHost + '/auth/refresh', { withCredentials: true })
        return response.data
    }
}