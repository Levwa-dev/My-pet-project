import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../../../services/admin-services/category-service";

const error = "Помилка завантаження даних"

export const adminFetchCategories = createAsyncThunk(
    'categories/adminFetchCategories',
    async (data, thunkAPI) => {
        try {
           const {page, params} = data
           const response = await categoryService.fetchCategories(page, params)
           if(!response.error){
            return response
           }
           return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const adminFetchCategory = createAsyncThunk(
    'categories/adminFetchCategory',
    async (data, thunkAPI) => {
        try {
            const {id} = data
            const response = await categoryService.fetchCategory(id)
            if(!response.error){
                return response.result
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
       
    }
)