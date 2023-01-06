import React from "react";
import { useParams } from "react-router-dom";

import { categoryService } from "../../../../services/admin-services/category-service";

import CategoryForm from "../add-or-edit-form/Category-form";

export default function CategoryEdit ({category}) {
    const {id} = useParams()

    const sendData = (data) => async(e) => {
        e.preventDefault()
        try {
            if(data.name !== '' || category.name === data.name){
                const response = await categoryService.editCategory(id, data)
                if(response.status === 200){
                    alert("Запис збережено")
                    window.location.reload(false)
                }
                if(response.data.error) alert(response.data.error)
            }
            else alert('Поле вводу пусте, абож назва не змінилась')
        } catch (e) {
            alert('Помилка збереження, спробуйте пізніше')
        }
    }
    return(
        <CategoryForm sendData={sendData} currentData={category}/>
    )
}