import React, {useEffect} from "react";
import style from './error-occurred.module.css'

export default function ErrorOccurred ({error}) {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <h1 className={style.title}>{error}</h1>
    )
}