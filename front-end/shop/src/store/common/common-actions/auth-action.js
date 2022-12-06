import { authService } from "../../../services/auth-services";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_PAGE, ADMIN_CATEGORY } from "../../../utils/consts";

const error = "Помилка з'єднання з сервером"

export const loginAction = createAsyncThunk( // відправляє пароль, пошту, та записує токен
    'user/loginAction',
    async(data, thunkAPI)=>{
        try {
           const response = await authService.login(data.body)
           if(!response.error){
                localStorage.setItem('token', response.token)
                data.navigate(ADMIN_CATEGORY)
                return response
           }
           return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
           return thunkAPI.rejectWithValue(error) 
        }
    }
)

export const logoutAction = createAsyncThunk( // виконує вихід з системи
    'user/logoutAction',
    async(navigate, thunkAPI)=>{
        try {
            const response = await authService.logout()
            if(response.result) {
                localStorage.removeItem('token')
                navigate(LOGIN_PAGE)
                return response
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const refreshAction = createAsyncThunk( // отримання нового аксес токену
    'user/refreshAction',
    async(token, thunkAPI) => {
        try {
            const response = await authService.refresh(token)
            if(!response.error){
                localStorage.setItem('token', response.token)
                return response
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
