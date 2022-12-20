import axios from "axios"
import { authService } from "../services/auth-services"

export const adminAxios = axios.create(
    {
        baseURL: process.env.REACT_APP_BACK_END_HOST + '/admin',
    }
)

adminAxios.interceptors.request.use( config => {   // При кожному виконанні запиту додаємо заголовок авторизаціїї
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})


adminAxios.interceptors.response.use( (config) => {
    return config

}, async (error) => { // Якщо статус 401, перезаписуємо токен, та повторюємо запит до серверу.
    const originalRequest = error.config
    if(error.response.status === 401 && error.config && !error.config._isRetry) {  
        originalRequest._isRetry = true
        try {
            const {token} = await authService.refresh()
            localStorage.setItem('token', token)
            originalRequest.headers = {'Authorization':`Bearer ${token}`}
            return adminAxios(originalRequest)
        } catch (error) {
            return error.response
        } 
    }
    return error.response
 }
)