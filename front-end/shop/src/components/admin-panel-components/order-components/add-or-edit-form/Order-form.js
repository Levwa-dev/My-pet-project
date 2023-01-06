import React, { useState } from "react"
import FormsLayout from "../../ui-components/forms-layout/Forms-layout"

export default function OrderForm ({ sendData, currentData = ''}) {
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])

    const saveData = (key) => (e) => {
        const copy = {...data}
        const value = e.target.value
        copy[key] = value
        setData(copy)
    }

    const addProduct = (e) => {
        e.preventDefault()
        const copy = [...products, {id:''}]
        setProducts(copy)
    }

    return (
        <FormsLayout sendData={sendData} data={data}>
            <label id="admin__firstName" className="admin__label">Ім'я</label>
            <input defaultValue={currentData.firstName} id="admin__firstName" onChange={saveData('firstName')} className="admin__input"/>

            <label id="admin__lastName" className="admin__label">Прізвище</label>
            <input defaultValue={currentData.lastName} id="admin__lastName" onChange={saveData('lastName')} className="admin__input"/>

            <label id="admin__patronymic" className="admin__label">По батькові</label>
            <input defaultValue={currentData.patronymic} id="admin__patronymic" onChange={saveData('patronymic')} className="admin__input"/>

            <label id="admin__telephone" className="admin__label">Телефон</label>
            <input defaultValue={currentData.telephone} id="admin__telephone" onChange={saveData('telephone')} className="admin__input"/>

            <label id="admin__street" className="admin__label">Вулиця</label>
            <input defaultValue={currentData.street} id="admin__street" onChange={saveData('street')} className="admin__input"/>

            <label id="admin__building" className="admin__label">Будинок</label>
            <input defaultValue={currentData.building} id="admin__building" onChange={saveData('building')} className="admin__input"/>

            <label id="admin__sector" className="admin__label">Під'їзд</label>
            <input defaultValue={currentData.sector} id="admin__sector" onChange={saveData('sector')} className="admin__input"/>

            <label id="admin__payment" className="admin__label">Сплата</label>
            <input defaultValue={currentData.payment} id="admin__payment" onChange={saveData('payment')} className="admin__input"/>

            <label id="admin__comment" className="admin__label">Коментар</label>
            <input defaultValue={currentData.comment} id="admin__comment" onChange={saveData('comment')} className="admin__input"/>

            { products &&
                products.map((item, index)=>{
                    return (
                        <div key={index}>
                            <button>X</button>
                            <input className="admin__input" placeholder="Введіть назву товару"/>
                            <button>Обрати</button>
                            <p>Обрано:</p>
                            <p></p>
                            <label id="admin__input-quatity" className="admin__label">Кількість</label>
                            <input id="admin__input-quatity" className="admin__input"/>
                        </div>
                    )
                })
            }
            <button onClick={addProduct}>Додати товар</button>
        </FormsLayout>
    )
}