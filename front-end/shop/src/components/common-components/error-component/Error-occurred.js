import React from "react";
import style from './error-occurred.module.css'

export default function ErrorOccurred ({error}) {

    return (
        <h1 className={style.title}>{error}</h1>
    )
}