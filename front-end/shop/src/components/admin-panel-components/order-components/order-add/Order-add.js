import React from "react";

import OrderForm from "../add-or-edit-form/Order-form";

export default function OrderAdd() {

    const sendData = (data) => () => {
        console.log('sd')
    }
    return (
        <OrderForm sendData={sendData} />
    )
}