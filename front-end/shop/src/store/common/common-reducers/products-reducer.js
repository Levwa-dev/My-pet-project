import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from '../common-actions/products-action'

const initialState = {
    product:'',
    productList:[],
    error:'',
    loading:false
}

export const commonProductsSlice = createSlice({
    name:'commonProducts',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) =>{
            state.product = action.payload
            state.error = ''
            state.loading = false
        })
        builder.addCase(getProduct.pending, (state, action) =>{
            state.error = ''
            state.loading = true
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            action.payload ?
                state.error = action.payload
                :
                state.error = action.error.message
            state.loading = false
        })
    }
})



export default commonProductsSlice.reducer