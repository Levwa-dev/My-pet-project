import React from "react";

import OrderForm from "../add-or-edit-form/Order-form";
import { validatorService } from "../../../../services/validator-services";
import { orderServices } from "../../../../services/admin-services/order-service";

export default function OrderAdd() {

    const template = {
        firstName:'',
        lastName:'',
        patronymic:'',
        telephone:'',
        street:'',
        building:'',
        sector:'',
        payment:'',
        orderedProducts:'',
        choosedBox:''
    }

    const sendData = (data) => async (e) => {
        try {
            const isFulfield = validatorService.checkFullfield(template, data)
            if(isFulfield) {
                const {orderedProducts} = data
                const {choosedBox} = data
                delete data.orderedProducts
                delete data.choosedBox
                const orderInfo = {...data}

                const response =  await orderServices.postOrder({orderedProducts, choosedBox, orderInfo})
                if(response.error){
                    throw new Error(response.error)
                }
                alert('Запис додано')
                window.location.reload(false)
            }
            else alert('Заповніть всі поля, та оберіть продукти')
        } catch (e) {
            alert(e.message)
        }
        e.preventDefault()
    }
    
    return (
        <OrderForm sendData={sendData} />
    )
}