import React, { useState } from "react"

import FormsLayout from "../../ui-components/forms-layout/Forms-layout"

export default function UserForm({sendData, currentData}) {
    const [data, setData] = useState({...currentData} || {name:'', password:'', secondPassword:'', email:''})
    const saveData = (key) => (e) => {
        const copy = {...data}
        copy[key] = e.target.value
        setData(copy)
    }
    
    return (
        <FormsLayout sendData={sendData} data={data}>
            <label id="admin__name" className="admin__label">Ім'я</label>
            <input defaultValue={data.name} id="admin__name" onChange={saveData('name')} className="admin__input"/>

            <label id="admin__password" className="admin__label">Пароль</label>
            <input defaultValue={data.password} id="admin__password" onChange={saveData('password')} className="admin__input"/>

            <label id="admin__password" className="admin__label">Повторіть пароль</label>
            <input  defaultValue={data.checkPassword} id="admin__password" onChange={saveData('secondPassword')} className="admin__input"/>

            <label id="admin__email" className="admin__label">Пошта</label>
            <input type='email' defaultValue={data.email} id="admin__email" onChange={saveData('email')} className="admin__input"/>
        </FormsLayout>
    )
}