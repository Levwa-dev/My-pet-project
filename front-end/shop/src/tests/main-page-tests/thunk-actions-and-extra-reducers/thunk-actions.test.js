import { getMainPageProducts } from "../../../store/common/common-actions/main-page-action";
import axios from "axios";
import { commonProductService } from "../../../services/common-services/product-service";

jest.mock('axios')

const thunk = getMainPageProducts()

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

describe("Get products for main component (Thunk)", ()=> {
    
    it('Should fetch with resolve response', async()=>{
        const dispatch = jest.fn()
        commonProductService.showProductOnMain = axios.get.mockResolvedValue(mockData)

        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('mainPage/getProducts/pending')
        expect(end[0].type).toBe('mainPage/getProducts/fulfilled')
        expect(end[0].payload).toBe(mockData)
    })


    it('Should fetch with rejected response', async()=>{
        const error = {error:'Error'}
        const dispatch = jest.fn()
        commonProductService.showProductOnMain = axios.get.mockResolvedValue(error)
        
        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('mainPage/getProducts/pending')
        expect(end[0].type).toBe('mainPage/getProducts/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toEqual(error.error)
    })
})