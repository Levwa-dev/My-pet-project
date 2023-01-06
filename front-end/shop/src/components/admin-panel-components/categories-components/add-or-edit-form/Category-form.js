import React, { useState } from "react"
import FormsLayout from "../../ui-components/forms-layout/Forms-layout"

export default function CategoryForm ({sendData, currentData = ''}) {
    const [data, setData] = useState({name:''})

    return (
        <FormsLayout sendData={sendData} data={data}>
            <label id="admin__category-name" className="admin__label">Назва</label>
            <input  defaultValue={currentData.name} id="admin__category-name" onChange={(e)=>setData({name:e.target.value})} className="admin__input"/>
        </FormsLayout>
    )
}