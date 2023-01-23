import { createSlice } from '@reduxjs/toolkit'
import { getProduct, getProductList } from '../common-actions/products-action'

const initialState = {
    product:'',
    productList:[],
    error:'',
    loading:false,
    pages:null,
    currentCategory:{ name:'Морозиво' }
}

export const commonProductsSlice = createSlice({
    name:'commonProducts',
    initialState,
    reducers:{
        setCurrentCategory (state, action) {
            state.currentCategory = action.payload
        },
        resetProductList (state, action) {
            state.productList = []
        }
    },
    extraReducers: (builder) => {
        // Робота з даними продукта
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

        // Робота з даними списку продуктів
        builder.addCase(getProductList.fulfilled, (state, action)=>{
            state.productList = action.payload.result
            state.pages = action.payload.pages
            state.error = ''
            state.loading = false
        })
        builder.addCase(getProductList.pending, (state, action) =>{
            state.error = ''
            state.loading = true
        })
        builder.addCase(getProductList.rejected, (state, action)=>{
            action.payload ?
                state.error = action.payload
                :
                state.error = action.error.message
            state.loading = false
        })
    }
})


export const {setCurrentCategory, resetProductList} = commonProductsSlice.actions
export default commonProductsSlice.reducer