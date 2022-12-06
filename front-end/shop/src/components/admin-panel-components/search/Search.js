import React from "react";
import style from "./search.module.css"

export default function Search ({searchFields}) {

    return (
        <div className={style.searchBody}>
            <form className={style.searchForm}>
                {
                    searchFields.map((item, index)=>{
                        return (
                            <div className={style.inputs} key={index}>
                                <label htmlFor={'input'+index}>{item}</label>
                                <input id={'input'+index}/>
                            </div>
                        )
                       
                    })
                }
            </form>
            <div className={style.searchButtons}>
                <button className={style.searchButton}>Знайти</button>
                <button className={style.resetButton}>Очистити фільтри</button>
            </div>
        </div>
    )
}