import React, { useState } from "react"
import FormsLayout from "../../ui-components/forms-layout/Forms-layout"

export default function CategoryForm ({sendData, currentData = ''}) {
    const [data, setData] = useState({name:'', product:true})

    return (
        <FormsLayout sendData={sendData} data={data}>
            <label id="admin__category-name" className="admin__label">Назва</label>
            <input  defaultValue={currentData.name} id="admin__category-name" onChange={(e)=>setData({name:e.target.value})} className="admin__input"/>

            <label id="admin__category-product" className="admin__label">Категорія продукту</label>
            <select defaultValue={+currentData.product || 1} id="admin__category-product" className="admin__input" onChange={(e)=>setData({product:e.target.value})}>
                <option value={1}>Так</option>
                <option value={0}>Ні</option>
            </select>
        </FormsLayout>
    )
}