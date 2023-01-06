import React from "react";
import CategoryForm from "../add-or-edit-form/Category-form";
import { categoryService } from "../../../../services/admin-services/category-service";

export default function CategoryAdd () {
    const sendData = (data) => async (e) => {
        e.preventDefault()
        try {
            if(data.name !== '' ){
                const response = await categoryService.addCategory(data)
                if(response.status === 200){
                    alert("Запис збережено")
                    window.location.reload(false)
                }
                if(response.data.error) alert(response.data.error)
            }
            else alert('Заповніть поле')
        } catch (e) {
            alert('Помилка збереження, спробуйте пізніше')
        }
    }
    return (
        <CategoryForm sendData={sendData}/>
    )
}