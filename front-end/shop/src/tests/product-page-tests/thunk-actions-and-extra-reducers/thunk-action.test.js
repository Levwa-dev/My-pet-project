import { getProduct } from "../../../store/common/common-actions/products-action";
import axios from "axios"
import { commonProductService } from "../../../services/common-services/product-service";

jest.mock('axios')

const thunk = getProduct({id:1})

const mockData = {
    result:{
        id:1,
        name:'ice',
        description:'i',
        picture:'asdw.png',
        pictures:[{id:1, picture:'asd'}, {id:2, picture:'dsa'}]
    }
}

describe('Get product for product page (Thunk)', ()=>{

    it("Should fetch with resolve response", async()=>{
        const dispatch = jest.fn()
        commonProductService.getProduct = axios.get.mockResolvedValue(mockData)

        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('commonProducts/getProduct/pending')
        expect(end[0].type).toBe('commonProducts/getProduct/fulfilled')
        expect(end[0].payload).toBe(mockData.result)
    })
    
    it("Should fetch with rejected response", async()=>{
        const error = {error:'Error'}
        const dispatch = jest.fn()
        commonProductService.getProduct = axios.get.mockResolvedValue(error)

        await thunk(dispatch)
        const {calls} = dispatch.mock
        expect(calls).toHaveLength(2)
        const [start, end] = calls

        expect(start[0].type).toBe('commonProducts/getProduct/pending')
        expect(end[0].type).toBe('commonProducts/getProduct/rejected')
        expect(end[0].meta.rejectedWithValue).toBe(true)
        expect(end[0].payload).toEqual(error.error)
    })
})