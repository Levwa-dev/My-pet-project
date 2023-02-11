import React from "react";
import style from "./add-button.module.css"
import { Link } from "react-router-dom"

export default function AdminAddButton ({title, url}) {
    if(!title || !url){
        return null
    }
    return(
        <Link to={url} className={style.add}>{title}</Link>
    )
}