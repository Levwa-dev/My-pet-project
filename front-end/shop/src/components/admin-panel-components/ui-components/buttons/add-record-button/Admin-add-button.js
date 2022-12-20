import React from "react";
import style from "./add-button.module.css"
import { Link } from "react-router-dom"

export default function AdminAddButton ({title}) {
    return(
        <Link to="#" className={style.add}>{title}</Link>
    )
}