import React from "react";
import logo from "../../../../../images/ice-logo.png"
import style from "./header.module.css"
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { MAIN, CART, CALLBACK } from "../../../../../utils/consts";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'

export default function Header () {

    const {orderedProduct} = useSelector(state=>state.cart)
    return (
            <header className={style.header}>
                <div className="wrapper">
                    <div className={style.container}>
                        <div className={style.logo}>
                            <img src={logo} alt="Logo"/>
                        </div>
                        <nav className={style.navigation}>
                            <ul className={style.navigationList} >
                                <li><Link to={MAIN}>Головна</Link></li>
                                <li><Link to={CALLBACK}>Написати нам</Link></li>
                            </ul>
                            <div className={style.cartContent}>
                                <Link to={CART} className={style.cart}>
                                    <FontAwesomeIcon icon={faBasketShopping} />
                                </Link>
                                { orderedProduct.length ?
                                    <div className={style.quantityProducts}>{orderedProduct.length}</div>
                                    :
                                    null
                                }
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
    )
}