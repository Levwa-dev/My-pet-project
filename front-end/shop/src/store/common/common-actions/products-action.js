import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonProductService } from "../../../services/common-services/product-service";

const error = "Помилка з'єднання з сервером"

export const getProduct = createAsyncThunk(
    'commonProducts/getProduct',
    async(data, {rejectWithValue}) => {
        try {
            const {id} = data
            const response = await commonProductService.getProduct(id)
            if(response.error) {
                return rejectWithValue(response.error)
            }
            return response.result
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)