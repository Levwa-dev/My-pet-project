import React from "react"
import {Link} from "react-router-dom"
import { ADMIN_CATEGORY, ADMIN_PRODUCTS } from "../../../../utils/consts"
import style from "./admin-navigation.module.css"

export default function AdminNavigation () {

    return (
        <div className={style.navContainer}>
            <nav>
                <ul>
                    <li className={style.navItem}><Link to={ADMIN_CATEGORY}>Категорії</Link></li>
                    <li className={style.navItem}><Link to={ADMIN_PRODUCTS}>Продукти</Link></li>
                    <li className={style.navItem}><Link to='#'>Замолення</Link></li>
                    <li className={style.navItem}><Link to='#'>Користувачі</Link></li>
                    <li className={style.navItem}><Link to='#'>Токени авторизації</Link></li>
                    <li className={style.navItem}><Link to='#'>Головні фото сторінок</Link></li>
                    <li className={style.navItem}><Link to='#'>Зворотній зв'язок</Link></li>
                    <li className={style.navItem}><Link to='#'>Відео</Link></li>
                </ul>
            </nav>
        </div>
    )
} 