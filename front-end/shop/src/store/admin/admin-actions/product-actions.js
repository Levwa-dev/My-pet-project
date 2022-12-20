import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../../../services/admin-services/product-service";

const error = "Помилка завантаження даних"

export const adminFetchProducts = createAsyncThunk(
    'product/adminFetchProducts',
    async (data, thunkAPI) => {
        try {
           const {page, params} = data
           const response = await productService.fetchProducts(page, params)
           if(!response.error){
            return response
           }
           return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const adminFetchProductsCategories = createAsyncThunk(
    'product/adminFetchProductsCategories',
    async (_, thunkAPI) => {
        try {
            const response = await productService.fetchCategories()
            if(!response.error) {
                return response
            } 
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const adminFetchProduct = createAsyncThunk(
    'product/adminFetchProduct',
    async(data, thunkAPI) => {
        try {
            const {id} = data
            const response = await productService.fetchProduct(id)
            if(!response.error){
                return response.result
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)