import React from "react";
import style from "./pagination.module.css"

export default function AdminPagination ({page, pages, setPage}) {
  
    const nextPage = () => {
        if(page<pages) setPage(++page)
    }

    const prevPage = () => {
        if(page > 1) setPage(--page)
    }

    return (
        <div className={style.paginationBody}>
            <button onClick={prevPage} className={style.nav}>Назад</button>
            <span className={style.page}>{page} / {pages}</span>
            <button onClick={nextPage} className={style.nav}>Вперед</button>
        </div>
    )
}