import React, {useEffect, useState } from "react"
import styles from './our-offers.module.css'

import { PRODUCT_LIST } from "../../../../utils/consts"
import ProductListItem from "../../product-list`s-item/ProductListItem"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentCategory } from "../../../../store/common/common-reducers/products-reducer"

export default function OurOffers ({products}) {
    const {currentCategory} = useSelector(state=>state.commonProducts)
    const dispatch = useDispatch()
    const [productToShow, setProductToShow] = useState([])

    useEffect(()=>{
        console.log(currentCategory.name)
        const productList = products.filter(item => item.category === currentCategory.name)
        const category = document.getElementsByClassName(styles.categoryItems)
        for(let item of category){
            if(item.textContent === currentCategory.name){
                item.classList.add(styles.activeCategory)
            }
        }
        setProductToShow(productList)
    },[currentCategory])

    const selectCategory = (key) => (e) => {
        const click = e.target
        const items = document.getElementsByClassName(styles.categoryItems)
        for(let item of items){
            item.classList.remove(styles.activeCategory)
        }
        click.classList.add(styles.activeCategory)
        dispatch(setCurrentCategory({name:key}))
    }

    return (
        <section className={styles.mainOffers}>
            <div className="wrapper">
                <a name="offers"></a>
                <h2 className={styles.title}>Наші пропозиції</h2>
                <ul className={styles.categoryList}>
                    <li className={styles.categoryItems} onClick={selectCategory('Морозиво')}>Морозиво</li>
                    <li className={styles.categoryItems} onClick={selectCategory('Десерти')}>Десерти</li> 
                    <li className={styles.categoryItems} onClick={selectCategory('Солодощі')}>Солодощі</li>  
                </ul>
                <ProductListItem products={productToShow}/> 
                <Link className={styles.moreLink} to={`${PRODUCT_LIST}/${productToShow[0]?.categoryId}`}>Більше</Link>
            </div> 
        </section>
    )
}