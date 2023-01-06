import { createSlice } from '@reduxjs/toolkit'
import { adminFetchProducts, adminFetchProductsCategories, adminFetchProduct } from '../admin-actions/product-actions'

const initialState = {
    productList:[],
    categories:[],
    product:'',
    error:'',
    isLoading:false,
    pages:'',
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        resetProduct (state, action) {
            state.product = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminFetchProducts.fulfilled, (state, action) => {
            state.productList = action.payload.result
            state.error = ''
            state.isLoading = false
            state.pages = action.payload.pages
        })
        builder.addCase(adminFetchProducts.pending, (state, action) => {
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(adminFetchProducts.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })

        // Знаходимо всі категорії
        builder.addCase(adminFetchProductsCategories.fulfilled, (state, action) => {
            state.categories = action.payload.result
        })
        builder.addCase(adminFetchProductsCategories.rejected, (state, action) => {
            state.error = action.payload
        })
        
        //Отримуємо певний продукт
        builder.addCase(adminFetchProduct.fulfilled, (state, action) => {
            state.product = action.payload
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(adminFetchProduct.pending, (state, action) => {
            state.error=''
            state.isLoading = true
        })
        builder.addCase(adminFetchProduct.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })

    }
})

export const {resetProduct} = productSlice.actions
export default productSlice.reducer