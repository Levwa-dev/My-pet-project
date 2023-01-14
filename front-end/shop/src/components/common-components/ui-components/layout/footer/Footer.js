import React, { useEffect, useState } from "react";
import style from "./footer.module.css"

import logo from "../../../../../images/ice-logo.png"
import facebook from "../../../../../images/facebook.png"
import instagram from "../../../../../images/instagram.png"
import twitter from "../../../../../images/twitter.png"

export default function Footer () {
    const [screenWidth, setScreenWidth] = useState(null)

    useEffect(()=>{
        setScreenWidth(document.body.clientWidth)
    },[])

    return (
        <footer className={style.background}>
            <div className="wrapper">
                <div className={style.content}>
                    <div className={style.logo}>
                        <img src={logo} alt='Logo'/>
                    </div>
                    { 
                        screenWidth > 700 ?
                        <>
                        <ul className={style.links}>    
                            <li><a href="#">Головна</a></li>
                            <li><a href="#">Морозиво</a></li>
                            <li><a href="#">Наші пропозиції</a></li>
                            <li><a href="#">Контакти</a></li>
                            <li><a href="#">Блог</a></li>
                        </ul> 
                        <ul className={style.links}> 
                            <li><a href="#">Доставка</a></li>
                            <li><a href="#">Політика використання</a></li>
                            <li><a href="#">Замовлення</a></li>
                        </ul>
                        </>
                       :
                       <ul className={style.links}>    
                            <li><a href="#">Політика використання</a></li>
                            <li><a href="#">Замовлення</a></li>
                            <li><a href="#">Контакти</a></li>
                            <li><a href="#">Доставка</a></li>
                            <li><a href="#">Блог</a></li>
                        </ul> 
                    }
                    <div>
                        <span className={style.socialsTitle}>Наші соц. мережі</span>
                        <ul className={style.socials}>
                            <li>
                                <a className={style.socialsLink} href="#"><img src={facebook} alt="Facebook"/></a>
                            </li>
                            <li>
                                <a className={style.socialsLink} href="#"><img src={twitter} alt="Twitter"/></a>
                            </li>
                            <li>
                                <a className={style.socialsLink} href="#"><img src={instagram} alt="Instagram"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}