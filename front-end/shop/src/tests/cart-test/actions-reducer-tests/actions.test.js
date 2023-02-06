import cartReducer, { orderProduct, removeProduct, increaseQuantityOfProducts,  decreaseQuantityOfProducts, resetCart } from "../../../store/common/common-reducers/cart-reducer";
import MockLocalStorage from "../../mock-local-storage/mock-local-storage";
const initialState = {
    orderedProduct: JSON.parse(localStorage.getItem('cart')) || []
}
const mockData = {
    boxId: 7,
    copy:{
        id:1,
        quantity:1,
        index: 1234,
        name:"",
        price:123,
        categoryId:1
    }
}
window.localStorage = new MockLocalStorage()

describe("Testing cart actions", ()=>{
    it("Should put in product to the cart", ()=>{
        const state = cartReducer(initialState, orderProduct(mockData))
        expect(state).toEqual(
            {
                orderedProduct:[mockData.copy]
            }
        )
        expect(window.localStorage.getItem('cart')).toEqual(JSON.stringify([mockData.copy]))
    })
    it("Should increase quantity of product", ()=>{
        const mockId = {item:{id:1}}
        const mockProduct = {id:1, quantity:2, index: 1234, name:"", price:123, categoryId:1}
        let state = cartReducer(initialState, orderProduct(mockData))
        state = cartReducer(state, increaseQuantityOfProducts(mockId))
        expect(state).toEqual(
            {
                orderedProduct:[mockProduct]
            }
        )
        expect(window.localStorage.getItem('cart')).toEqual(JSON.stringify([mockProduct]))
    })
    it("Should decrease quantity of product", ()=>{
        const mockId = {item:{id:1}}
        let state = cartReducer(initialState, orderProduct(mockData))
        state = cartReducer(state, increaseQuantityOfProducts(mockId))
        state = cartReducer(state, decreaseQuantityOfProducts(mockId))
        expect(state).toEqual(
            {
                orderedProduct:[mockData.copy]
            }
        )
        expect(window.localStorage.getItem("cart")).toEqual(JSON.stringify([mockData.copy]))
    })
    it("Should remove product from cart", ()=>{
        const mockSecondProduct = {
            boxId: 7,
            copy:{
                id:1,
                quantity:1,
                index: 12345,
                name:"",
                price:123,
                categoryId:7
            }
        }
        let state = cartReducer(initialState, orderProduct(mockSecondProduct))
        state = cartReducer(state, orderProduct(mockData))
        expect(state).toEqual(
            {
                orderedProduct: [mockData.copy, mockSecondProduct.copy]
            }
        )
        expect(window.localStorage.getItem('cart')).toEqual(JSON.stringify(state.orderedProduct))
        state = cartReducer(state, removeProduct({product:{id:1}, boxId:7}))
        expect(window.localStorage.getItem('cart')).toEqual(JSON.stringify([]))
        expect(state).toEqual(
            {
                orderedProduct: []
            }
        )
    })
    it("Should reset cart", ()=> {
        let state = cartReducer(initialState, orderProduct(mockData))
        expect(state).toEqual({
            orderedProduct: [mockData.copy]
        })
        state = cartReducer(state, resetCart())
        expect(state).toEqual({
            orderedProduct:[]
        })
    })
})