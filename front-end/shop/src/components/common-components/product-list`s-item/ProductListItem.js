import React from "react";
import styles from "./product-list-item.module.css"

import uah from '../../../images/uah.png'

import {PRODUCT} from '../../../utils/consts'
import { Link } from 'react-router-dom'

export default function ProductListItem ({products}) {

    return (
        <div className={styles.content}>
            { products
                && products.map((item)=>{
                    return(
                        <div key={item.id} className={styles.item}>
                            <img className={styles.infoPicture} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + item.picture} alt='Фото товару' />
                            <div className={styles.info}>
                                <h3 className={styles.infoTitle}>{item.name}</h3>
                                <p className={styles.infoDetail} dangerouslySetInnerHTML={{__html: item.description}}></p>
                                <div className={styles.bottomBlock}>
                                    <div className={styles.priceBlock}>
                                        <p className={styles.price}>{item.price}</p>
                                        <img className={styles.priceCurrency} src={uah} alt="Грн."/>
                                    </div>
                                    <Link to={PRODUCT + '/' + item.id} className={styles.detailLink}>Купити зараз</Link>
                                </div>
                            </div>
                        </div>   
                    )
                })     
            }
        </div>    
    )
}