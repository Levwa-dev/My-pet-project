import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderServices } from "../../../services/admin-services/order-service";

const error = 'Помилка завантаження оголошень'

export const fetchOrders = createAsyncThunk(
    'adminOrder/fetchOrders',
    async (data, thunkAPI) => {
        try {
            const {page, params} = data
            const response = await orderServices.fetchOrders(page, params)
            if(!response.error){
                return response
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const fetchOrder = createAsyncThunk (
    'adminOrder/fetchOrder',
    async (data, thunkAPI) => {
        try {
            const response = await orderServices.fetchOrder(data.id)
            if(!response.error) {
                return response
            }
            return thunkAPI.rejectWithValue(response.error)
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }  
    }

)