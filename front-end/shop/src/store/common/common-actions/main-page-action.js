import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonProductService } from "../../../services/common-services/product-service";

const error = "Помилка з`єднання з сервером"

export const getMainPageProducts = createAsyncThunk(
    'mainPage/getProducts',
    async(_, thunkAPI) => {
        try {
            const response = await commonProductService.showProductOnMain()
            if(response.error){
                return thunkAPI.rejectWithValue(response.error)
            }
            return response
        } catch (e) {
            return thunkAPI.rejectWithValue(error)
        }    
    }
)