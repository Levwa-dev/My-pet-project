import React, { useEffect, useMemo, useState } from "react";
import AdminAddButton from "../buttons/add-record-button/Admin-add-button"
import Search from "../../search/Search";
import AdminPagination from "../../pagination/Admin-pagination";
import LoadingComponent from "../../../common-components/loading/Loading";
import ErrorOccurred from "../../../common-components/error-component/Error-occurred";
import style from "./body-layout.module.css"

import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"


export default function BodyLayout (props) {
    const {url, searchFields, fetchAction, state, buttonTitle, children, selectSearchFields, addURL } = props
    const [page, setPage] = useState(1)
    const [searchParams, setSearchParams] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useMemo(() => { // Встановлюємо page з параметрів URL при перезавантаженні сторінки, щоб не скидувати значення page
        setPage(params.page)
    },[])

    useEffect(() => { // При зміні сторінки, отримуємо нові дані
        dispatch(fetchAction({page, params:searchParams}))
        navigate(url + '/' + page)
    }, [page, searchParams])

    return (
        <>
            <Search searchFields = {searchFields}
                    selectSearchFields = {selectSearchFields}
                    setSearchParams = {setSearchParams}
                    setPage = {setPage} />
            <section>
                    <div className={style.bodyLayout}>
                        {
                            /* Помилка ? відобраємо помилку, якщо ні, перевіряємо
                               чи завантажились дані, якщо так, тоді показуємо їх.
                            */
                        }
                        {   state.isLoading ?
                                <LoadingComponent/>
                                :
                                <>
                                    <AdminAddButton url={addURL} title = { buttonTitle } />
                                    <div className={style.content}>
                                        {  state.error ?
                                                <ErrorOccurred error={state.error}/>
                                                :
                                                children 
                                        } 
                                    </div>
                                    { !state.error && <AdminPagination page={page} pages={state.pages} setPage={setPage}/>}
                                </>
                        }
                    </div>
            </section>
        </>
    )
}