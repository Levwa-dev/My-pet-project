import React from "react";
import style from '../delete-record-button/Admin-delete-button.module.css'

import { useNavigate, useParams } from "react-router-dom";

export default function AdminDeleteButton ({deleteFunction}) {
    const {id} = useParams()
    const navigate = useNavigate()

    const deleteProduct = (deleteFunction) => async(e) => {
        const confirmation = window.confirm("Видалити цей зпис?")
        try {
            if(confirmation){
                const response = await deleteFunction(id)
                if(response.result) {
                    alert("Запис видаленно")
                    navigate(-1)
                }
                if(response.error) {
                    alert(response.error)
                }
            }  
        } catch (e) {
            alert("Помилка з'єднання з сервером")
        }
       
    }

    return (
        <button onClick={deleteProduct(deleteFunction)} className={style.edit}>Видалити</button>
    )
}