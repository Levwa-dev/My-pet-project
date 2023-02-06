import { renderWithProviders } from "../../../utils/utils-for-test-redux-component";
import { screen, waitFor } from "@testing-library/react";

import { cartService } from "../../../services/common-services/cart-service";
import userEvent from "@testing-library/user-event";
import MockLocalStorage from "../../mock-local-storage/mock-local-storage";
import Deliver from "../../../components/common-components/cart-component/deliver-component/Deliver";
import axios from "axios";

const mockOrder = {
    orderedProducts:[
        { productId:1, productName:'Ice Cream', price:123 }
    ],
    chooseBox:[
        {   boxId: 2,
            boxName: 'Box',
            price:12,
            productId:1,
            productName:'Ice Cream',
            id:1
        }
    ]
}
jest.mock("axios")
const today = cartService.getDateForInput(new Date)
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

window.localStorage = new MockLocalStorage()
window.alert = jest.fn()
window.scrollTo = jest.fn()

describe("Test deliver form", ()=>{
    it("Delivery component renders without order", ()=>{
        renderWithProviders(<Deliver/>)
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
    })
    describe("Delivery component renders with order in the localStorage", ()=>{
        beforeEach(()=>{
            localStorage.setItem('order', JSON.stringify(mockOrder))
        })

        it("Send data without an error", async()=>{
            renderWithProviders(<Deliver/>)
            expect(screen.getByRole('form')).toBeInTheDocument()
            cartService.makeOrder = axios.post.mockResolvedValue({data:{result:true}})

            userEvent.type(screen.getByRole('firstName'),'Valeriy')
            userEvent.type(screen.getByRole('lastName'),'Dmitriev')
            userEvent.type(screen.getByRole('street'),'Peremoga')
            userEvent.type(screen.getByRole('building'),'105a')
            userEvent.type(screen.getByRole('sector'),'4')
            userEvent.type(screen.getByRole('telephone'),'380555555555')
            userEvent.type(screen.getByRole('time'),'15:00')
            userEvent.click(screen.getByRole('cash'))

            expect(screen.getByRole('firstName').value).toBe('Valeriy')
            expect(screen.getByRole('lastName').value).toBe('Dmitriev')
            expect(screen.getByRole('street').value).toBe('Peremoga')
            expect(screen.getByRole('building').value).toBe('105a')
            expect(screen.getByRole('sector').value).toBe('4')
            expect(screen.getByRole('telephone').value).toBe('380555555555')
            expect(screen.getByRole('date').value).toBe(today)
            expect(screen.getByRole('time').value).toBe('15:00')
            expect(screen.getByRole('cash').value).toBe('Готівка')

            userEvent.click(screen.getByText("Замовити"))
            await waitFor(()=>{
                expect(screen.getByText("Дякуємо за замовлення")).toBeInTheDocument()            }
            )
        })

        it("Return an error when trying to submit a form with empty input", ()=>{
            renderWithProviders(<Deliver/>)
            expect(screen.getByRole('form')).toBeInTheDocument()
            cartService.makeOrder = axios.post.mockResolvedValue({data:{result:true}})

            userEvent.type(screen.getByRole('firstName'),'Valeriy')
            userEvent.type(screen.getByRole('lastName'),'Dmitriev')
            userEvent.type(screen.getByRole('street'),'Peremoga')

            expect(screen.getByRole('firstName').value).toBe('Valeriy')
            expect(screen.getByRole('lastName').value).toBe('Dmitriev')
            expect(screen.getByRole('street').value).toBe('Peremoga')

            userEvent.click(screen.getByText("Замовити"))
            expect(cartService.makeOrder).toHaveBeenCalledTimes(0)            
        })
        it("If server is not responding, return an error", async()=>{
            renderWithProviders(<Deliver/>)
            expect(screen.getByRole('form')).toBeInTheDocument()
            cartService.makeOrder = axios.post.mockRejectedValueOnce({response:{data:{error:'Error'}}})
            
            userEvent.type(screen.getByRole('firstName'),'Valeriy')
            userEvent.type(screen.getByRole('lastName'),'Dmitriev')
            userEvent.type(screen.getByRole('street'),'Peremoga')
            userEvent.type(screen.getByRole('building'),'105a')
            userEvent.type(screen.getByRole('sector'),'4')
            userEvent.type(screen.getByRole('telephone'),'380555555555')
            userEvent.type(screen.getByRole('time'),'15:00')
            userEvent.click(screen.getByRole('cash'))

            userEvent.click(screen.getByText("Замовити"))
            expect(cartService.makeOrder).toHaveBeenCalledTimes(1)
            await waitFor(()=>{
                expect(window.alert).toHaveBeenCalledTimes(1)
                expect(window.alert).toHaveBeenCalledWith('Error') 
            })
        })

    })
})