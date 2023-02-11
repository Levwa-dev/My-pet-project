import React, {useState} from "react"
import styles from "./callBack.module.css"
import ErrorOccurred from "../error-component/Error-occurred"

import { MAIN } from "../../../utils/consts"
import { Link } from "react-router-dom"
import { callBackService } from "../../../services/common-services/callBack-service"



export default function CallBack () {
    const [callBack, setCallBack] = useState({firstName:'', lastName:'', number:'', call:'Зателефонувати'})
    const [ok, setOk] = useState(false)
    const [error, setError] = useState('')

    const saveData = (key) => (e) => {
        const copy = {...callBack}
        copy[key] = e.target.value
        setCallBack(copy)
    }
    const submit = async(e) => {
        e.preventDefault()
        const result = await callBackService.sendData(callBack, "callBack__form")
        result === true ?
            setOk(true)
            :
            setError(result)
    }
    if(ok){
        return (
            <main className={styles.mainBody}>
                <div className="wrapper">
                    <div className={styles.thanksContainer}>
                        <div>
                            <h1 className={styles.thanks}>Дякую за вашу заявку. Cкоро з вами зв'яжуться</h1>
                            <Link className={styles.onMain} to={MAIN}>До головної</Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    if(error){
        return (
            <main className={styles.mainBody}>
                <ErrorOccurred error={error} />
            </main>
        )
    }

    return (
        <main className={styles.mainBody}>
            <div className="wrapper">
                <h1 className={styles.title}>Якщо у вас виникли питання, ви можете залишити заявку, та через декілька хвилин отримати відповідь від нашого консультанта.</h1>
                <form className={styles.formBody} role="callBack__form" name="callBack__form">
                    <label className={styles.labels} htmlFor="firstName">Ім'я</label>
                    <input value={callBack.firstName} role="firstName" onChange={saveData("firstName")} id="firstName" type='text'/>

                    <label className={styles.labels} htmlFor="lastName">Прізвище</label>
                    <input value={callBack.lastName} role = "lastName" onChange={saveData("lastName")} id="lastName" type='text'/>

                    <label className={styles.labels} htmlFor="telephone">Телефон</label>
                    <input style={{letterSpacing:'5px'}} role="telephone" value={callBack.number} onChange={saveData("number")} id="telephone" placeholder="380 50 505 0505" type='tel'/>

                    <label className={styles.container}>
                        Зателефонувати
                        <input defaultChecked onChange={saveData("call")} role="call" type='radio' value="Зателефонувати" name="group-1"/>
                        <span className={styles.checkmark}></span>
                    </label>

                    <label className={styles.container}>
                        Написати у Telegram
                        <input onChange={saveData("call")} role="telegram" type='radio' value="Написати у Telegram" name="group-1"/>
                        <span className={styles.checkmark}></span>
                    </label>

                    <label className={styles.container}>
                        Написати у Viber
                        <input onChange={saveData("call")} role="viber" type='radio' value="Написати у Viber" name="group-1"/>
                        <span className={styles.checkmark}></span>
                    </label>
                    <button onClick={submit} className={styles.sendBtn}>Залишити заявку</button>
                </form>
            </div>
        </main>
    )
}