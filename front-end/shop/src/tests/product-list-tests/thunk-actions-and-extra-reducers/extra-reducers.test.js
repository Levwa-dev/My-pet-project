import commonProductsReducer, {setCurrentCategory, resetProductList} from "../../../store/common/common-reducers/products-reducer"
import { getProductList } from "../../../store/common/common-actions/products-action"

const initialState = {
    product:'',
    productList:[],
    error:'',
    loading:false,
    pages:null,
    currentCategory:{ name:'Морозиво' }
}

const mockData = {
    pages:2,
    result:[
        {
            id:1,
            picture:'ice-cream.png',
            name:'ice',
            description:'cream',
            price: 123,
            category: 'Морозиво',
            categoryId: 2
        },
        {
            id:2,
            picture:'dessert.png',
            name:'dessert',
            description:'dessertDesc',
            price: 122,
            category: 'Морозиво',
            categoryId: 2
        },
    ]
}

describe("Testing product list page`s extra reducers", ()=>{
    it("Should fetch product with 'getProductList.fulfilled' action", ()=>{
        const state = commonProductsReducer(initialState, getProductList.fulfilled(mockData))
        expect(state).toEqual(
            {
                product:'',
                productList: mockData.result,
                error:'',
                loading: false,
                pages: mockData.pages,
                currentCategory: { name:'Морозиво' }  
            }
        )
    })

    it("Should fetch product list with 'getProductList.pending' action", ()=>{
        const state = commonProductsReducer(initialState, getProductList.pending())
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                error:'',
                loading: true,
                pages:null,
                currentCategory: { name:'Морозиво' }  
            }
        )
    })

    it("Should fetch product list with 'getProductList.rejected' action", ()=>{
        const state = commonProductsReducer(initialState, getProductList.rejected('Error'))
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                error:'Error',
                loading: false,
                pages:null,
                currentCategory: { name:'Морозиво' }  
            }
        )
    })
})

describe("Testing product list page`s reducers", ()=>{
    it("Should set current page", ()=>{
        const mockCategory = { name:'Десерти' }
        const state = commonProductsReducer(initialState, setCurrentCategory(mockCategory))
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                error:'',
                loading:false,
                pages:null,
                currentCategory:{ name:'Десерти' }
            }
        )
    })
    
    it("Should reset product list", ()=>{
        const stateWithProducts = initialState
        stateWithProducts.productList = mockData.result
        const state = commonProductsReducer(stateWithProducts, resetProductList())
        expect(state).toEqual(
            {
                product:'',
                productList:[],
                error:'',
                loading:false,
                pages:null,
                currentCategory:{ name:"Морозиво" }
            }
        )
    })
})
