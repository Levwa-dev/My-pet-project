import React, {useEffect, useState } from "react"
import styles from './our-offers.module.css'

import uah from '../../../../images/uah.png'

import {PRODUCT} from '../../../../utils/consts'
import { Link } from 'react-router-dom'

export default function OurOffers ({products}) {
    const [currentCategory, setCurrentCategory] = useState({name:'Морозиво'})
    const [productToShow, setProductToShow] = useState([])

    useEffect(()=>{
        const productList = products.filter(item => item.category === currentCategory.name)
        setProductToShow(productList)
    },[currentCategory])

    const selectCategory = (key) => () => {
        setCurrentCategory({name:key})
    }

    const showCurrentCategory = (className, childClass) => (e) => {
        const click = e.target
        if(click.tagName === 'UL') return
        const items = document.getElementsByClassName(childClass)
        for(let item of items){
            item.classList.remove(className)
        }
        click.classList.add(className)
    }

    return (
        <section className={styles.mainOffers}>
            <div className="wrapper">
                <a name="offers"></a>
                <h2 className={styles.title}>Наші пропозиції</h2>
                <ul onClick={showCurrentCategory(styles.activeCategory, styles.categoryItems )} className={styles.categoryList}>
                    <li className={[styles.categoryItems, styles.activeCategory ].join(' ')} onClick={selectCategory('Морозиво')}>Морозиво</li>
                    <li className={styles.categoryItems} onClick={selectCategory('Десерти')}>Десерти</li> 
                    <li className={styles.categoryItems} onClick={selectCategory('Солодощі')}>Солодощі</li>  
                </ul>
                <div className={styles.content}>
                    { productToShow
                        && productToShow.map((item)=>{
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
            </div> 
        </section>
    )
}