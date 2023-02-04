import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonProductService } from "../../../services/common-services/product-service";
import { commonCategoryService } from "../../../services/common-services/category-service";

const error = "Помилка з'єднання з сервером"

export const getBoxCategory = createAsyncThunk(
    'commonProducts/getBoxCategory',
    async(_, {rejectValue}) => {
        try {
            const response = await commonCategoryService.getBoxCategory()
            if(response.error){
                return rejectValue(response.error)
            }
            return response.result
        } catch (e) {
            return rejectValue(error)
        }
    }
)

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

export const getProductList = createAsyncThunk(
    'commonProducts/getProductList',
    async(data, {rejectWithValue}) => {
        try {
            const {page, category, productList} = data
            const response = await commonProductService.getProductList(page, category)
            if(response.error) {
                return rejectWithValue(response.error)
            }
            response.result = [...productList, ...response.result]
            return response
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)