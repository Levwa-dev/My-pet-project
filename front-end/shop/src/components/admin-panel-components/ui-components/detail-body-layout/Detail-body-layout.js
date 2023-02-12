import React, {useEffect, useState} from "react";

import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";


import style from './detail-body-layout.module.css'
import AdminEditButton from "../buttons/edit-record-button/Admin-edit-button";
import AdminDeleteButton from "../buttons/delete-record-button/Admin-delete-button";
import LoadingComponent from "../../../common-components/loading/Loading";
import ErrorOccurred from "../../../common-components/error-component/Error-occurred";

export default function DetailBody ({ children , error, loading, fetch, reset, deleteFunction, editForm }) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const [edit, setEdit] = useState(false)

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
                                    {editForm && <AdminEditButton edit={edit} setEdit={setEdit}/>}
                                    <AdminDeleteButton deleteFunction={deleteFunction}/>
                                </div>
                            </section>
                            { edit ?
                                editForm
                                :
                                <section>{children}</section>
                            }
                        </>
            }
        </main>
    )
}