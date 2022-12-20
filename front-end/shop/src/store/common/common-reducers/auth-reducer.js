import { createSlice } from '@reduxjs/toolkit'
import { loginAction, logoutAction, refreshAction } from '../common-actions/auth-action'
const initialState = {
    id:'',
    name: '',
    isAdmin:false,
    error:'',
    isLoading:false
}
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        throwError (state, action) {
            state.error = action.payload
        },
        setUser (state, action) {
            state.id = action.payload.id
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action)=>{
            state.id = action.payload.id
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(loginAction.pending, (state, action)=>{
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(loginAction.rejected, (state, action)=>{
            state.error = action.payload
            state.isLoading = false
        })

        builder.addCase(logoutAction.fulfilled, (state, action)=>{
            state.id = ''
            state.name = ''
            state.isAdmin = false
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(logoutAction.pending, (state, action)=>{
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(logoutAction.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action
        })

        builder.addCase(refreshAction.fulfilled, (state, action)=>{
            state.id = action.payload.id
            state.name = action.payload.name
            state.isAdmin = action.payload.isAdmin
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(refreshAction.pending, (state, action)=>{
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(refreshAction.rejected, (state, action)=>{
            state.error = action.payload
            state.isLoading = false
        })
    }
})

export const {throwError, setUser} = userSlice.actions
export default userSlice.reducer
