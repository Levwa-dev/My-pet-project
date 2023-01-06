import React from "react"
import style from './forms-layout.module.css'

export default function FormsLayout ({children, sendData, data}) {
    return (
        <main className={style.mainBody}>
            <div className={style.container}>
                <form className={style.formBody}>
                    {children}
                    <button onClick={sendData(data)} className={style.submit}>Підтвердити</button>
                </form>
            </div>
        </main>
    )
}