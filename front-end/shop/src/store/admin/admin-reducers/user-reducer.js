import { createSlice } from '@reduxjs/toolkit'
import { fetchUserList, fetchUser } from '../admin-actions/users-actions'

const initialState = {
    users:"",
    user:'',
    error:'',
    isLoading:false,
    pages:''
}

export const adminSlice = createSlice({
    name:'admins',
    initialState,
    reducers:{
        resetUser(state, action) {
            state.user = ''
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUserList.fulfilled, (state, action)=> {
            state.users = action.payload.result
            state.pages = action.payload.pages
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchUserList.pending, (state, action)=> {
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(fetchUserList.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
    }

})

export const {resetUser} = adminSlice.actions
export default adminSlice.reducer