import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./product-in-cart.module.css"
import { CART } from "../../../../../utils/consts"

export default function ProductInCart () {
    const navigate = useNavigate()

    const backToList = () =>{
        navigate(-1)
    }

    const closePopUp = () => {
        const popUp = document.getElementById('order__pop-up')
        popUp.style.display = 'none'
    }

    return (
        <div id="order__pop-up" className={styles.popUp}>
            <div onClick={closePopUp} className={styles.background}></div>
            <div className={styles.popUpBody}>
                <span onClick={closePopUp} className={styles.cancel}>X</span>
                <h2 className={styles.title}>Товар у кошику!</h2>
                <span className={styles.listLink} onClick={backToList}>До списку товарів</span>
                <Link className={styles.link} to={CART}>До кошику</Link>
            </div>
        </div>
    )

}