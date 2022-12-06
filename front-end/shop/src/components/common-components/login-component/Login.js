import React, { useState } from "react";
import style from "./login.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

import { validatorService } from "../../../services/validator-services";
import { throwError } from "../../../store/common/common-reducers/auth-reducer";
import { loginAction } from "../../../store/common/common-actions/auth-action";

export default function LoginComponent () {
    const {error} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendData = (e) => {
        e.preventDefault()
        !validatorService.validateEmail(email) || !validatorService.validatePassword(password) ?
            dispatch(throwError("Невірний формат пошти, або паролю. \n Пароль має бути тільки латиницею, з цифрами та не менше 6 літер"))
                :
            dispatch(loginAction({body:{email, password}, navigate}))
    }

    return (
        <section>
            <div className="wrapper">
                <div className={style.modal}>
                    <form>
                        <input onChange={e => setEmail(e.target.value)} className={style.inputs} id="login-email" placeholder="Email" type='email'/>
                        <input onChange={e => setPassword(e.target.value)} className={style.inputs} id="login-password" placeholder="Password" type='password'/>
                        <button onClick={sendData} className={style.loginButton}>Увійти</button>
                    </form>
                    {
                        error && <span className={style.error}>{error}</span>
                    }
                </div>
            </div>
        </section>
    ) 
}