import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../services/admin-services/user-service";

const error = "Помилка завантаження"

export const fetchUserList = createAsyncThunk(
    "admins/fetchUsersList",
    async(data, {rejectWithValue}) => {
        try {
            const {page, params} = data
            const response = await userService.getUsersList(page, params)
            if(response.error){
                return rejectWithValue(response.error)
            }
            return response
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)

export const fetchUser = createAsyncThunk(
    "admins/fetchUser",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await userService.getUser(id)
            if(response.error){
                return rejectWithValue(response.error)
            }
            return response.result
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)