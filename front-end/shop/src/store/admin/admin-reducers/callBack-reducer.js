import { createSlice } from "@reduxjs/toolkit";

import { fetchCallBack, fetchCallBacks } from "../admin-actions/callBack-actions";

const initialState = {
    records:'',
    record:'',
    pages:'',
    error:'',
    isLoading:false
}

export const callBackSlice = createSlice({
    name:'callBack',
    initialState,
    reducers:{
        resetRecord (state, action) {
            state.record = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCallBacks.fulfilled, (state, action)=>{
            state.records = action.payload.result
            state.pages = action.payload.pages
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchCallBacks.pending, (state, action)=>{
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(fetchCallBacks.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })


        builder.addCase(fetchCallBack.fulfilled, (state, action)=>{
            state.record = action.payload
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchCallBack.pending, (state, action)=>{
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(fetchCallBack.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const {resetRecord} = callBackSlice.actions
export default callBackSlice.reducer