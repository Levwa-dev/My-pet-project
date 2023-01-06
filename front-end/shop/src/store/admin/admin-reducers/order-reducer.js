import { createSlice } from '@reduxjs/toolkit'
import { fetchOrders, fetchOrder } from '../admin-actions/order-actions'

const initialState = {
    orders: '',
    order: '',
    error: '',
    isLoading: false,
    pages: ''
}

export const orderSlice = createSlice({
    name:'adminOrder',
    initialState,
    reducers: {
        resetOrder(state, actions) {
            state.order = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, actions) => {
            state.orders = actions.payload.result
            state.pages = actions.payload.pages
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchOrders.pending, (state, actions) => {
            state.error = ''
            state.isLoading = true
        })
        builder.addCase(fetchOrders.rejected, (state, actions) => {
            state.error = actions.payload
            state.isLoading = false
        })

        builder.addCase(fetchOrder.fulfilled, (state, actions) => {
            state.order = actions.payload.result
            state.error = ''
            state.isLoading = false
        })
        builder.addCase(fetchOrder.pending, (state, actions) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(fetchOrder.rejected, (state, actions) => {
            state.error = actions.payload
            state.isLoading = false
        })
    }
})


export const {resetOrder} = orderSlice.actions
export default orderSlice.reducer