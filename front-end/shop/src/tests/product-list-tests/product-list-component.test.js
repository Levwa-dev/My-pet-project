import {screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from 'axios'
import { commonProductService } from "../../services/common-services/product-service"
import { renderWithProviders } from "../../utils/utils-for-test-redux-component"
import ProductList from "../../components/common-components/product-list-component/ProductList"

window.alert = jest.fn()
jest.mock("axios")
window.scrollTo = jest.fn()
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

const moreProducts = {
    pages:2,
    result:[
        {
            id:3,
            picture:'candy.png',
            name:'candy',
            description:'candyDesc',
            price: 122,
            category: 'Морозиво',
            categoryId: 2
        },
    ]
}

describe("Product list component", ()=>{
    
    it("Product list component renders with data", async()=>{
        commonProductService.getProductList = axios.get.mockResolvedValue(mockData)
        renderWithProviders(<ProductList/>)
        await waitFor(()=>{
            expect(screen.getByText('Морозиво')).toBeInTheDocument()
            expect(screen.getByText('ice')).toBeInTheDocument()
            expect(screen.getByText('dessert')).toBeInTheDocument()
        })
    })

    it("Product list component renders an error", async()=>{
        commonProductService.getProductList = axios.get.mockResolvedValue({error:"Error"})
        renderWithProviders(<ProductList/>)
        await waitFor(()=>{
            expect(screen.getByText('Error')).toBeInTheDocument()
        })
    })

    it("Product list component renders loading component", async()=>{
        commonProductService.getProductList = axios.get.mockResolvedValue(mockData)
        renderWithProviders(<ProductList/>)

        expect(screen.getByText('Loading...')).toBeInTheDocument()
        await waitFor(()=>{
            expect(screen.getByText('Морозиво')).toBeInTheDocument()
            expect(screen.getByText('ice')).toBeInTheDocument()
            expect(screen.getByText('dessert')).toBeInTheDocument()
        })
    })

    it("Show more products action works", async()=>{
        commonProductService.getProductList = axios.get.mockResolvedValue(mockData)
        renderWithProviders(<ProductList/>)
        await waitFor(()=>{
            expect(screen.getByText('Морозиво')).toBeInTheDocument()
            expect(screen.getByText('ice')).toBeInTheDocument()
            expect(screen.getByText('dessert')).toBeInTheDocument()

            commonProductService.getProductList = axios.get.mockResolvedValue(moreProducts)
            userEvent.click(screen.getByText('Завантажити ще'))
            expect(screen.getByText('candy'))
        })
    })

    it("Change category", async()=>{
        const anotherCategory = {
            pages:2,
            result:[
                {
                    id:3,
                    picture:'candy.png',
                    name:'candy',
                    description:'candyDesc',
                    price: 122,
                    category: 'Десерти',
                    categoryId: 2
                },
            ]
        }
        commonProductService.getProductList = axios.get.mockResolvedValue(anotherCategory)
        renderWithProviders(<ProductList/>)
        await waitFor(()=>{
            expect(screen.getByText('Десерти')).toBeInTheDocument()
            expect(screen.getByText('candy')).toBeInTheDocument()
        })
    })
})