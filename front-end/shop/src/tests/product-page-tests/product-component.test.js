import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import * as reduxHooks from "react-redux"
import Product from "../../components/common-components/product-component/Product"

jest.mock('react-redux')

const mockData = {
    product:{
        id:1,
        name:'ice',
        description:'i',
        picture:'asdw.png',
        pictures:[{id:1, picture:'asd'}, {id:2, picture:'dsa'}],
    },
    error:'',
    loading:false
}

const mockDispatch = jest.spyOn(reduxHooks, 'useDispatch')
const mockSelector = jest.spyOn(reduxHooks, 'useSelector')

describe("Product component", ()=>{
    it("Product component renders with data", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockSelector.mockReturnValue(mockData)

        render(<Product/>, {wrapper: MemoryRouter})
        expect(screen.queryByRole('main-picture')).toBeInTheDocument()
        expect(screen.queryByText('ice')).toBeInTheDocument()
    })

    it("Product component renders an error", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.error='some error'
        mockSelector.mockReturnValue(mockData)

        render(<Product/>, {wrapper:MemoryRouter})
        expect(screen.queryByText('some error')).toBeInTheDocument()
    })

    it("Product renders loading component", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.error=''
        mockData.loading = true
        mockSelector.mockReturnValue(mockData)

        render(<Product/>, {wrapper:MemoryRouter})
        expect(screen.queryByText('Loading...')).toBeInTheDocument()
    })
})