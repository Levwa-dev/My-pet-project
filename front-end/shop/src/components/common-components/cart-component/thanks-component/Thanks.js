import React from "react";
import styles from "./thanks.module.css"
import mark from "../../../../images/mark.png"
import { Link } from 'react-router-dom'
import { MAIN } from '../../../../utils/consts'

export default function Thanks () {
    return (
        <main className={styles.mainBody}>
            <div className="wrapper">
                <h1 className={styles.title}>Дякуємо за замовлення</h1>
                <div className={styles.mark}>
                    <img src={mark} alt="OK"/>
                </div>
                <p className={styles.info}>
                Наш адміністратор зв’яжеться з вами за декілька хвилин для уточнення вказаних вами даних. Гарного дня!
                </p>
                <Link className={styles.link} to={MAIN}>До головної</Link>
            </div>
        </main>
    )
}