import { renderWithProviders } from "../../../utils/utils-for-test-redux-component";
import { screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"
import MockLocalStorage from "../../mock-local-storage/mock-local-storage";
import Cart from "../../../components/common-components/cart-component/Cart";

const mockCart = [
    {
        id:1,
        quantity:1,
        name:"Ice Cream",
        price:123,
        categoryId:1,
        picture:'asd.png',
        index: Math.random() * 10000
    },
    {
        id:2,
        quantity:1,
        name:"Candy",
        price:122,
        categoryId:7,
        picture:'asdw.png',
        index: Math.random() * 10000
    }
]

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

window.localStorage = new MockLocalStorage()
window.alert = jest.fn()


describe("Cart component tests", ()=>{
    it("Cart component renders without cart list",()=>{
        renderWithProviders(<Cart/>)
        expect(screen.getByText("Кошик пустий. Спочатку оберіть товар")).toBeInTheDocument()
    })
    beforeEach(()=>{
        localStorage.clear()
    })
    it("Cart component renders with fulfilled cart", ()=>{
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:mockCart},
                commonProducts : {boxCategory:{id:7}}
             }
        })
        expect(screen.getAllByText("Ice Cream")).toHaveLength(2)
        expect(screen.getByText("Candy")).toBeInTheDocument()
        expect(screen.getByText("- Ice Cream")).toBeInTheDocument()
        expect(screen.getByText("123.00 грн.")).toBeInTheDocument()
        expect(screen.getByText("- Candy")).toBeInTheDocument()
        expect(screen.getByText("122.00 грн.")).toBeInTheDocument()
        expect(screen.getByText("245.00 грн.")).toBeInTheDocument()
        expect(screen.getByText('"Candy"')).toBeInTheDocument()
        expect(screen.getByText("Далі")).toBeInTheDocument()
    })
    it("Increase and decrease a product quantity in the cart component", ()=>{
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:mockCart},
                commonProducts : {boxCategory:{id:7}}
             }
        })
        userEvent.click(screen.getAllByText("+")[0])

        expect(screen.getAllByText("Ice Cream")).toHaveLength(2)
        expect(screen.getByText("2")).toBeInTheDocument()
        expect(screen.getByText("X 2")).toBeInTheDocument()
        expect(screen.getByText("368.00 грн.")).toBeInTheDocument()

        userEvent.click(screen.getAllByText("—")[0])
        expect(screen.getAllByText("Ice Cream")).toHaveLength(2)
        expect(screen.getAllByText("1")[0]).toBeInTheDocument()
        expect(screen.getAllByText("X 1")[0]).toBeInTheDocument()
        expect(screen.getByText("245.00 грн.")).toBeInTheDocument()
    })
    it("Remove product from cart", ()=>{
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:mockCart},
                commonProducts : {boxCategory:{id:7}}
             }
        })
        expect(screen.getAllByText("Ice Cream")).toHaveLength(2)
        expect(screen.getByText("Candy")).toBeInTheDocument()
        userEvent.click(screen.getAllByAltText('Delete')[1])
        expect(screen.getAllByText("Ice Cream")).toHaveLength(1)
        expect(screen.queryByText("Candy")).toBe(null)
        expect(screen.queryByText('"Candy"')).toBe(null)
    })
    it("Choose container for product", ()=>{
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:mockCart},
                commonProducts : {boxCategory:{id:7}}
             }
        })
        expect(screen.getByRole("checkmark").checked).toBe(false)
        userEvent.click(screen.getAllByText("Ice Cream")[1])
        expect(screen.getByRole("checkmark").checked).toBe(true)
    })
    it("Try to choose an additional container for the product that is already in the container", ()=>{
        const thirdProduct = {
            id:3,
            quantity:1,
            name:"Cream",
            price:123,
            categoryId:1,
            picture:'asd.png',
            index: Math.random() * 10000
        }
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:[thirdProduct, ...mockCart]},
                commonProducts : {boxCategory:{id:7}}
             }
        })

        userEvent.click(screen.getAllByText("+")[2])
        userEvent.click(screen.getAllByText("Ice Cream")[1])
        expect(screen.getAllByRole("checkmark")[1].checked).toBe(true)
        expect(screen.getAllByRole("checkmark")[2].checked).toBe(false)

        userEvent.click(screen.getAllByText("Ice Cream")[2])
        expect(screen.getAllByRole("checkmark")[1].checked).toBe(true)
        expect(screen.getAllByRole("checkmark")[2].checked).toBe(false)
    })
    it("Go to delivery page", ()=>{
        renderWithProviders(<Cart/>, {
            preloadedState: { 
                cart: {orderedProduct:mockCart},
                commonProducts : {boxCategory:{id:7}}
             }
        })
        const orderedProduct = {
            productId: mockCart[0].id,
            price: mockCart[0].price,
            name: mockCart[0].name,
        }
        const choosedBox = {
            boxId: mockCart[1].id,
            boxName: mockCart[1].name,
            price: mockCart[1].price,
            productId:0,
            productName:'',
            id:1
        }

        userEvent.click(screen.getByText("Далі"))
        expect(window.localStorage.getItem('order')).toEqual(JSON.stringify({ orderedProducts:[orderedProduct], chooseBox:[choosedBox]}))
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
    describe("Should return 'order' from localStorage", ()=>{
        beforeEach(()=>{
            const order = {
                orderedProducts:[
                    { productId:mockCart[0], productName:'Ice Cream', price:mockCart[0].price }
                ],
                chooseBox:[
                    {   boxId: mockCart[1].id,
                        boxName: mockCart[1].name,
                        price: mockCart[1].price,
                        productId:1,
                        productName:'Ice Cream',
                        id:1
                    }
                ]
            }
            localStorage.setItem('order', JSON.stringify(order))
        })

        it("Cart component renders with an `order` from localStorage", ()=>{
            renderWithProviders(<Cart/>, {
                preloadedState: { 
                    cart: {orderedProduct:mockCart},
                    commonProducts : {boxCategory:{id:7}}
                 }
            })
            expect(screen.getByRole("checkmark").checked).toBe(true)
        })
    })
})