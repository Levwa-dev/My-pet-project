import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import * as reduxHooks from "react-redux"

import ProductList from "../../components/common-components/product-list-component/ProductList"


jest.mock('react-redux')

const mockSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockDispatch = jest.spyOn(reduxHooks, 'useDispatch')

const mockData = {
    currentCategory:{name:'Морозиво'},
    productList:[
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

describe("Product list component", ()=>{
    it("Product list component renders with data", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockSelector.mockReturnValue(mockData)

        render(<ProductList/>, {wrapper: MemoryRouter})
        expect(screen.getByText('Морозиво')).toBeInTheDocument()
        expect(screen.getByText('ice')).toBeInTheDocument()
        expect(screen.getByText('dessert')).toBeInTheDocument()
    })

    it("Product list component renders an error", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.error="Error"
        mockSelector.mockReturnValue(mockData)

        render(<ProductList/>, {wrapper:MemoryRouter})
        expect(screen.getByText('Error')).toBeInTheDocument()
    })
    it("Product list component renders loading component", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.error=''
        mockData.loading = true
        mockSelector.mockReturnValue(mockData)

        render(<ProductList/>, {wrapper:MemoryRouter})
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

})