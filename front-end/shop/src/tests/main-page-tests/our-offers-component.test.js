import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"

import OurOffers from "../../components/common-components/main-component/our-offers-component/Our-offers"

const products = [
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
]

describe('Our offers component', ()=>{
    it('First render', ()=>{
        render(<OurOffers products={products}/>, {wrapper:MemoryRouter})
        
        expect(screen.getByText('Морозиво')).toHaveClass('activeCategory')
        expect(screen.getByText('Десерти').classList.contains('activeCategory')).toBe(false)
        expect(screen.getByText('Солодощі').classList.contains('activeCategory')).toBe(false)

        expect(screen.queryByText('ice')).toBeInTheDocument()
        expect(screen.queryByText('candy')).toBeNull()
        expect(screen.queryByText('dessert')).toBeNull()
    })

    it("Select another product list", ()=>{
        render(<OurOffers products={products}/>, {wrapper:MemoryRouter})
        userEvent.click(screen.getByText('Десерти'))

        expect(screen.getByText('Морозиво').classList.contains('activeCategory')).toBe(false)
        expect(screen.getByText('Солодощі').classList.contains('activeCategory')).toBe(false)
        expect(screen.getByText('Десерти')).toHaveClass('activeCategory')

        expect(screen.queryByText('ice')).toBeNull()
        expect(screen.queryByText('candy')).toBeNull()
        expect(screen.queryByText('dessert')).toBeInTheDocument()
    })
})