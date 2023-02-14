import React, { useState } from "react";
import style from "./login.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

import { validatorService } from "../../../services/validator-services";
import { throwError } from "../../../store/common/common-reducers/auth-reducer";
import { loginAction, registrationAction } from "../../../store/common/common-actions/auth-action";

export default function LoginComponent () {
    const {error} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [registration, setRegistration] = useState(false)

    const sendLoginData = (e) => {
        e.preventDefault()
        !validatorService.validateEmail(email) || !validatorService.validatePassword(password) ?
            dispatch(throwError("Невірний формат пошти, або паролю. \n Пароль має бути тільки латиницею, з цифрами та не менше 6 літер"))
                :
            dispatch(loginAction({body:{email, password}, navigate}))
    }


    const sendRegistrationData = (e) => {
        e.preventDefault()
        if(!name) {
            dispatch(throwError("Ім'я відсутнє"))
            return
        }
        !validatorService.validateEmail(email) || !validatorService.validatePassword(password) ?
            dispatch(throwError("Невірний формат пошти, або паролю. \n Пароль має бути тільки латиницею, з цифрами та не менше 6 літер"))
                :
            dispatch(registrationAction({body:{email, password, name}, navigate}))
    }

    return (
        <section>
            <div className="wrapper">
                <div className={style.modal}>
                    { !registration ?
                        <form>
                            <input value={email} onChange={e => setEmail(e.target.value)} className={style.inputs} id="login-email" placeholder="Email" type='email'/>
                            <input value={password} onChange={e => setPassword(e.target.value)} className={style.inputs} id="login-password" placeholder="Password" type='password'/>
                            <button onClick={sendLoginData} className={style.loginButton}>Увійти</button>
                        </form>
                        :
                        <form>
                            <input value={name} onChange={e => setName(e.target.value)} className={style.inputs} id="login-name" placeholder="Ім'я" type='name'/>
                            <input value={email} onChange={e => setEmail(e.target.value)} className={style.inputs} id="login-email" placeholder="Email" type='email'/>
                            <input value={password} onChange={e => setPassword(e.target.value)} className={style.inputs} id="login-password" placeholder="Пароль" type='password'/>
                            <button onClick={sendRegistrationData} className={style.loginButton}>Зареєструватися</button>
                        </form>
                    }
                    <p onClick={()=>setRegistration(!registration)} className={style.registration}>{ !registration ? "Перша реєстрація" : "Скасувати"}</p>
                    {
                        error && <span className={style.error}>{error}</span>
                    }
                </div>
            </div>
        </section>
    ) 
}