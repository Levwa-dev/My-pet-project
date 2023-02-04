import React from "react";
import styles from './cart-quantity-btn.module.css'


export default function CartQuantityBtn ({children, action}) {
    return (
        <button onClick={action} className={styles.btn}>{children}</button>
    )   
}