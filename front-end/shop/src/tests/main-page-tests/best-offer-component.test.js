import {render, screen} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import BestOffer from "../../components/common-components/main-component/best-offer-component/Best-offer"

const bestOffer = {
    id:1,
    name: 'ice cream',
    description: 'ice desc',
    picture: 'asdw.png'
}
window.scrollTo = jest.fn()

describe("Best offer component", ()=>{
    it("The component renders", ()=>{
        render(<BestOffer bestOffer={bestOffer}/>, {wrapper: MemoryRouter})

        expect(screen.getByText('ice cream')).toBeInTheDocument()
    })
})