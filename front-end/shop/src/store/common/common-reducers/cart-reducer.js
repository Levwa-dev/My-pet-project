import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderedProduct: JSON.parse(localStorage.getItem('cart')) || [],
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        // Додавання продукту до корзини
        orderProduct(state, action){
            const {orderedProduct} = state
            const {copy, boxId} = action.payload
            copy.categoryId === boxId ?
                orderedProduct.push(copy)
                :
                orderedProduct.unshift(copy)
            localStorage.setItem('cart', JSON.stringify(orderedProduct))
        },
        // Збільшення кількості товару в корзині
        increaseQuantityOfProducts (state, action) {
            for(let item of state.orderedProduct) {
                if(item.id === action.payload.item.id){
                    item.quantity++
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.orderedProduct))
        },
        // Зменшення кількості товарів в корзині
        decreaseQuantityOfProducts (state, action) {
            const actionItem = action.payload.item
            const {orderedProduct} = state
            
            for(let item of orderedProduct){
                if(item.id === actionItem.id && item.quantity > 1){
                    item.quantity--
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.orderedProduct))
        },
        // Видалення продукту з корзини
        removeProduct (state, action) {
            const {product, boxCategory} = action.payload 
            let productList = state.orderedProduct.filter(item => item.id !== product.id)

            const boxCount = productList.filter(item=> item.categoryId === boxCategory.id).length
            const productCount =  productList.filter(item=> item.categoryId !== boxCategory.id).length
            
            if(boxCount && !productCount){ // Якщо в корзині не залишились лише пакунки, обнулити корзину
                productList = []
            }
            state.orderedProduct = productList
            localStorage.setItem('cart', JSON.stringify(state.orderedProduct))
        },
        resetCart(state, action){
            state.orderedProduct = []
        }
    }
})

export const { orderProduct, removeProduct, increaseQuantityOfProducts,  decreaseQuantityOfProducts, resetCart } = cartSlice.actions
export default cartSlice.reducer 