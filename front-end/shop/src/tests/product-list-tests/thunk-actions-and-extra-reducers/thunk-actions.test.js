import { getProductList } from "../../../store/common/common-actions/products-action";
import axios from "axios";
import { commonProductService } from "../../../services/common-services/product-service";

jest.mock('axios')

const thunk = getProductList({page:1,category:3,productList:[]})

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

describe("Get products for product list page (Thunk)", ()=>{
    it("Should fetch with resolve response", async()=>{
        const dispatch = jest.fn()
        commonProductService.getProductList = axios.get.mockResolvedValue(mockData)

        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('commonProducts/getProductList/pending')
        expect(end[0].type).toBe('commonProducts/getProductList/fulfilled')
        expect(end[0].payload).toBe(mockData)
    })

    it("Should fetch with reject response", async()=>{
        const error = {error:"Error"}
        const dispatch = jest.fn()
        commonProductService.getProductList = axios.get.mockResolvedValue(error)

        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('commonProducts/getProductList/pending')
        expect(end[0].type).toBe('commonProducts/getProductList/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toEqual(error.error)

    })
})