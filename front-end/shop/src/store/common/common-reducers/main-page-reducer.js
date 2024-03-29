import { createSlice } from '@reduxjs/toolkit'
import { getMainPageProducts } from '../common-actions/main-page-action'

const initialState = {
    products:[],
    bestOffer:{},
    loading:false,
    error:''
}

export const mainPageSlice = createSlice({
    name:'mainPage',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        // Отримання товарів для головної сторінки
        builder.addCase(getMainPageProducts.fulfilled, (state, action)=>{
            state.products = action.payload.result
            state.bestOffer = action.payload.bestOffer
            state.loading = false
            state.error = ''
        })
        builder.addCase(getMainPageProducts.pending, (state, action)=>{
            state.error = ''
            state.loading = true
        })
        builder.addCase(getMainPageProducts.rejected, (state, action)=>{
            action.payload ? 
                state.error = action.payload
                :
                state.error = action.error.message
            state.loading = false
        })
    }
})

export default mainPageSlice.reducer