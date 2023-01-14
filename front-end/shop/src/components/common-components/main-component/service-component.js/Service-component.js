import React from "react";
import styles from "./service-component.module.css"

import pack from '../../../../images/package.svg'
import delivery from '../../../../images/delivery.svg'

export default function ServiceComponent () {
    return (
        <section className={styles.service}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <img className={styles.image} src={delivery} alt='Доставка'/>
                    <h3 className={styles.title}>Безкоштовна доставка</h3>
                    <p style={{width:'222px'}} className={styles.text}>Доставимо все вчасно та безкоштовно</p>
                </div>
                <div className={styles.item}>
                    <img className={styles.image} src={pack} alt='Пакування'/>
                    <h3  className={styles.title}>Якісне пакування</h3>
                    <p style={{width:'235px'}} className={styles.text}>Наше морозиво запаковане у ланч-бокси</p>
                </div>
            </div>
        </section>
    )
}