import React, {useEffect} from "react";

import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";


import style from './detail-body-layout.module.css'
import AdminEditButton from "../buttons/edit-record-button/Admin-edit-button";
import AdminDeleteButton from "../buttons/delete-record-button/Admin-delete-button";
import LoadingComponent from "../../../common-components/loading/Loading";
import ErrorOccurred from "../../../common-components/error-component/Error-occurred";

export default function DetailBody ({ children , error, loading, fetch, reset }) {
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=>{
        dispatch(fetch({id}))
        return ()=>{
            dispatch(reset())
        }
    },[])
    

    return (
        <main className={style.mainBody}>
            { error ?
                <ErrorOccurred error={error}/>
                    :
                    loading ?
                        <LoadingComponent/>
                        :
                        <>
                            <section className={style.buttons}>
                                <div className={style.container}>
                                    <AdminEditButton/>
                                    <AdminDeleteButton/>
                                </div>
                            </section>
                            <section>
                                {children}
                            </section>
                        </>

            }
        </main>
    )
}