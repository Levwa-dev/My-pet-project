import React from "react";
import style from '../edit-record-button/Admin-edit-button.module.css'

export default function AdminEditButton ({edit, setEdit}) {
    return (
        <button onClick={()=>{setEdit(!edit)}} className={style.edit}>{edit ? 'Скасувати' : 'Редагувати'}</button>
    )
}