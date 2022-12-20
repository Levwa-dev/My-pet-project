import { createSlice } from '@reduxjs/toolkit'
import { adminFetchCategories, adminFetchCategory } from '../admin-actions/category-actions'

const initialState = {
    categories:[],
    category:'',
    isLoading: false,
    error:'',
    pages:'',
}

export const categorySlice = createSlice({
    name:'categories',
    initialState,
    reducers:{
        resetCategory(state, action){
            state.category = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminFetchCategories.fulfilled, (state, action)=>{
            state.categories = action.payload.result
            state.pages = action.payload.pages
            state.isLoading = false
            state.error = ''
        })
        builder.addCase(adminFetchCategories.pending, (state, action)=>{
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(adminFetchCategories.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

        
        builder.addCase(adminFetchCategory.fulfilled, (state, action) => {
            state.category = action.payload
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(adminFetchCategory.pending, (state, action) => {
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(adminFetchCategory.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
    }
})

export const {resetCategory} = categorySlice.actions
export default categorySlice.reducer