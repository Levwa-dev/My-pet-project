import { screen, render, waitFor } from "@testing-library/react"
import CallBack from "../../components/common-components/callBack-component/CallBack"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { callBackService } from "../../services/common-services/callBack-service"
import axios from "axios";


jest.mock("axios")
window.scrollTo = jest.fn()

describe("CallBack component tests", ()=>{
    it("CallBack component renders", ()=>{
        render( <CallBack/>, {wrapper: MemoryRouter})
        expect(screen.getByRole('callBack__form')).toBeInTheDocument()
    })
    it("Send callBack form", async()=>{
        render( <CallBack/>, {wrapper: MemoryRouter})
        expect(screen.getByRole('callBack__form')).toBeInTheDocument()
        callBackService.sendData = axios.post.mockResolvedValue(true)

        userEvent.type(screen.getByRole("firstName"), 'Valery')
        userEvent.type(screen.getByRole("lastName"), 'Dmitriev')
        userEvent.type(screen.getByRole("telephone"), '+380666666666')
        userEvent.click(screen.getByRole("call"))

        expect(screen.getByRole('firstName').value).toEqual('Valery')
        expect(screen.getByRole('lastName').value).toEqual('Dmitriev')
        expect(screen.getByRole('telephone').value).toEqual('+380666666666')
        expect(screen.getByRole('call').value).toEqual('Зателефонувати')

        userEvent.click(screen.getByText("Залишити заявку"))

        await waitFor(()=>{
            expect(screen.getByText("Дякую за вашу заявку. Cкоро з вами зв'яжуться")).toBeInTheDocument()            }
        )
    })
    it("An error occurred while sending request", async()=>{
        render( <CallBack/>, {wrapper: MemoryRouter})
        expect(screen.getByRole('callBack__form')).toBeInTheDocument()
        callBackService.sendData = jest.fn(()=> "Error")

        userEvent.type(screen.getByRole("firstName"), 'Valery')
        userEvent.type(screen.getByRole("lastName"), 'Dmitriev')
        userEvent.type(screen.getByRole("telephone"), '+380666666666')
        userEvent.click(screen.getByRole("call"))

        expect(screen.getByRole('firstName').value).toEqual('Valery')
        expect(screen.getByRole('lastName').value).toEqual('Dmitriev')
        expect(screen.getByRole('telephone').value).toEqual('+380666666666')
        expect(screen.getByRole('call').value).toEqual('Зателефонувати')

        userEvent.click(screen.getByText("Залишити заявку"))

        await waitFor(()=>{
            expect(screen.getByText("Error")).toBeInTheDocument()            }
        )
    })
    it("Try to send empty form", async()=>{
        render( <CallBack/>, {wrapper: MemoryRouter})
        expect(screen.getByRole('callBack__form')).toBeInTheDocument()

        userEvent.type(screen.getByRole("firstName"), 'Valery')

        expect(screen.getByRole('firstName').value).toEqual('Valery')

        userEvent.click(screen.getByText("Залишити заявку"))

        await waitFor(()=>{
            expect(callBackService.sendData).toHaveBeenCalledTimes(1)
            expect(axios).toHaveBeenCalledTimes(0)
        })
    })
})