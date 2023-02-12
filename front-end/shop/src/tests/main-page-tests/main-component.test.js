import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import * as reduxHooks from "react-redux"
import MainComponent from "../../components/common-components/main-component/Main-component"

jest.mock('react-redux')
window.scrollTo = jest.fn()
const mockData = {
    products : [
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
    error:'',
    loading:false,
    bestOffer:{
        id: 1,
        name: 'ice cream',
        description: 'ice desc',
        picture: 'asdw.png'
    },
    currentCategory:{name:'Морозиво'}
}

const mockSelector = jest.spyOn(reduxHooks, 'useSelector')
const mockDispatch = jest.spyOn(reduxHooks, 'useDispatch')

describe('Main component', ()=>{
    it("Main component renders with data", ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockSelector.mockReturnValue(mockData)

        render(<MainComponent/>, {wrapper: MemoryRouter})
        expect(screen.getByRole('main-info')).toBeInTheDocument()
    })

    it('Main component render loading component', ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.loading=true
        mockSelector.mockReturnValue(mockData)

        render(<MainComponent/>, {wrapper: MemoryRouter})
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('Main component render error component', ()=>{
        const dispatch = jest.fn()
        mockDispatch.mockReturnValue(dispatch)
        mockData.error='Error'
        mockSelector.mockReturnValue(mockData)

        render(<MainComponent/>, {wrapper: MemoryRouter})
        expect(screen.getByText('Error')).toBeInTheDocument()
    }) 
})
