import React from "react"
import style from "./admin-header.module.css"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { logoutAction } from "../../../../store/common/common-actions/auth-action"

export default function AdminHeader () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
            <header className={style.background}>
                <div className="wrapper">
                    <div className={style.content}>
                        <span className={style.shopName}>ICE</span>
                        <div>
                            <span className={style.userName}>Admin</span>
                            <button onClick={()=>dispatch(logoutAction(navigate))} className={style.logOut}>Вийти</button>
                        </div>
                    </div>
                </div>
            </header>
    )
} 