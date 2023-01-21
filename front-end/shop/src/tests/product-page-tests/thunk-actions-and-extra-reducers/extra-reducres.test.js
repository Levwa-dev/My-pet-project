import commonProductsReducer from "../../../store/common/common-reducers/products-reducer"
import { getProduct } from "../../../store/common/common-actions/products-action"

const initialState = {
    productList:[],
    product:'',
    loading:false,
    error:''
}

const mockData = {
    result:{
        id:1,
        name:'ice',
        description:'i',
        picture:'asdw.png',
        pictures:[{id:1, picture:'asd'}, {id:2, picture:'dsa'}]
    }
}

describe("Testing product page`s extra reducers", ()=>{
    it("Shuold fetch product with 'getPRoduct.fulfilled' action", ()=>{
        const state = commonProductsReducer(initialState, getProduct.fulfilled(mockData.result))
        expect(state).toEqual(
            {
                product: mockData.result,
                productList:[],
                loading:false,
                error:''
            }
        )
    })

    it("Shuold fetch product with 'getPRoduct.pending' action", ()=>{
        const state = commonProductsReducer(initialState, getProduct.pending())
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                loading:true,
                error:''
            }
        )
    })

    it("Shuold fetch product with 'getPRoduct.rejected' action", ()=>{
        const state = commonProductsReducer(initialState, getProduct.rejected("Error"))
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                loading:false,
                error:'Error'
            }
        )
    })
})