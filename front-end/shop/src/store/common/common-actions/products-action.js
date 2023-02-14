import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonProductService } from "../../../services/common-services/product-service";
import { commonCategoryService } from "../../../services/common-services/category-service";

const error = "Помилка з'єднання з сервером"

export const getBoxCategory = createAsyncThunk( // Отримання даних категорії пакунків та передача їх до ред'юсеру
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

export const getProduct = createAsyncThunk( // Отримання даних товару та передача їх до ред'юсеру
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

export const getProductList = createAsyncThunk( // Отримання даних списку товарів та передача їх до ред'юсеру
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