import mainPageReducer from "../../../store/common/common-reducers/main-page-reducer"
import { getMainPageProducts } from "../../../store/common/common-actions/main-page-action"

const initialState = {
    products:[],
    bestOffer:{},
    loading:false,
    error:''
}

const mockData = {
    result:[
        {
            id:1,
            picture:'ice-cream.png',
            name:'ice',
            description:'cream',
            price: 123,
            category: 'Морозиво'
        },
        {
            id:2,
            picture:'dessert.png',
            name:'dessert',
            description:'dessertDesc',
            price: 122,
            category: 'Десерти'
        },
        {
            id:3,
            picture:'candy.png',
            name:'candy',
            description:'Candy desc',
            price: 124,
            category: 'Солодощі'
        }
    ],
    bestOffer:{
        id:1,
        name: 'ice cream',
        description: 'ice desc',
        picture: 'asdw.png'
    }
}

describe("Testing main page`s extra reducers", ()=>{
    it('should fetch product with "getMainPageProducts.fulfilled" action', ()=>{
        const state = mainPageReducer(initialState, getMainPageProducts.fulfilled(mockData))
        expect(state).toEqual(
            {
                products:mockData.result,
                bestOffer:mockData.bestOffer,
                loading:false,
                error:''
            }
        )
    })

    it('should fetch product with "getMainPageProducts.pending" action', ()=>{
        const state = mainPageReducer(initialState, getMainPageProducts.pending())
        expect(state).toEqual(
            {
                products:[],
                bestOffer:{},
                loading:true,
                error:''
            }
        )
    })

    it('should fetch product with "getMainPageProducts.rejected" action', ()=>{
        const state = mainPageReducer(initialState, getMainPageProducts.rejected('Error'))
        expect(state).toEqual(
            {
                products:[],
                bestOffer:{},
                loading:false,
                error:'Error'
            }
        )
    })
})