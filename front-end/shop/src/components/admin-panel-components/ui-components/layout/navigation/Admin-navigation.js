import React from "react"
import {Link} from "react-router-dom"
import { ADMIN_CATEGORY, ADMIN_PRODUCTS, ADMIN_ORDERS, ADMIN_USERS, ADMIN_CALLBACKS } from "../../../../../utils/consts"
import style from "./admin-navigation.module.css"

export default function AdminNavigation () {

    return (
        <div className={style.navContainer}>
            <nav>
                <ul>
                    <li className={style.navItem}><Link to={ADMIN_CATEGORY + '/1'}>Категорії</Link></li>
                    <li className={style.navItem}><Link to={ADMIN_PRODUCTS + '/1'}>Продукти</Link></li>
                    <li className={style.navItem}><Link to={ADMIN_ORDERS + '/1'}>Замолення</Link></li>
                    <li className={style.navItem}><Link to={ADMIN_USERS + '/1'}>Адміністратори</Link></li>
                    <li className={style.navItem}><Link to={ADMIN_CALLBACKS + '/1'}>Зворотній зв'язок</Link></li>
                </ul>
            </nav>
        </div>
    )
} 