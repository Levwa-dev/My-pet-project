import React from "react";
import logo from "../../../../images/ice-logo.png"
import style from "./header.module.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'

export default function Header () {

    return (
            <header className={style.header}>
                <div className="wrapper">
                    <div className={style.container}>
                        <div className={style.logo}>
                            <img src={logo} alt="Logo"/>
                        </div>
                        <nav className={style.navigation}>
                            <ul className={style.navigationList} >
                                <li><a href="#">Головна</a></li>
                                <li><a href="#">Написати нам</a></li>
                            </ul>
                            <button className={style.cart}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
    )
}