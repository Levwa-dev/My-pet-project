import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getProduct } from "../../../store/common/common-actions/products-action"
import { useParams } from "react-router-dom"
import { orderProduct } from "../../../store/common/common-reducers/cart-reducer"

import uah from '../../../images/uah.png'

import styles from './product.module.css'

import SlickSlider from "./slider-component/Slider"
import ErrorOccured from "../error-component/Error-occurred"
import LoadingComponent from "../loading/Loading"
import ProductInCart from "../ui-components/pop-up/product-in-cart/ProductInCart"

export default function Product () {
    const dispatch = useDispatch()
    const {product, error, loading, boxCategory} = useSelector(state=>state.commonProducts)
    const {orderedProduct} = useSelector(state=>state.cart)
    const {id} = useParams()

    const addProductToOrder = () =>{
        window.scrollTo(0,0)
        let productAlreadyInCart = false
        const popUp = document.getElementById('order__pop-up')
        popUp.style.display = 'block'
        orderedProduct.map(item => { 
            if(item.id === product.id){
                productAlreadyInCart = true
                return
            }
        })
        if(!productAlreadyInCart){
            const copy = {...product, quantity:1, index: Date.parse(new Date())}
            dispatch(orderProduct({copy, boxId:boxCategory.id}))
        }
    }

    useEffect(()=>{
        dispatch(getProduct({id}))
    },[])

    return (
        <main>
            <ProductInCart/>
            <div className="wrapper">
                { error ?
                    <ErrorOccured error={error}/>
                    :
                    loading ?
                        <div className={styles.loadingBody}><LoadingComponent/></div>
                        :
                        <>
                            {
                            product && !product.pictures.length ?
                                <img className={styles.picture} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + product.picture} alt={"Фото продукту"}/>
                                :
                                <SlickSlider mainPhoto={product.picture} pictures={product.pictures} />
                            }
                            <h1 className={styles.title}>{product.name}</h1>
                            <div className={styles.description} dangerouslySetInnerHTML={{__html:product.description}}></div>
                            <div className={styles.priceContent}>
                                <span className={styles.price}>{product.price?.toFixed(2)}</span>
                                <img className={styles.priceImg} src={uah} alt="грн."/>
                            </div>
                            
                            <button onClick={addProductToOrder} className={styles.order}>Замовити</button>
                        </>
                }
            </div>
        </main>
    )
}