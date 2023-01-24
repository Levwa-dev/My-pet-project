import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getProduct } from "../../../store/common/common-actions/products-action"
import { useParams } from "react-router-dom"

import styles from './product.module.css'

import SlickSlider from "./slider-component/Slider"
import ErrorOccured from "../error-component/Error-occurred"
import LoadingComponent from "../loading/Loading"

export default function Product () {
    const dispatch = useDispatch()
    const {product, error, loading} = useSelector(state=>state.commonProducts)
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getProduct({id}))
    },[])

    return (
        <main>
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
                            <button className={styles.order}>Замовити</button>
                        </>
                }
            </div>
        </main>
    )
}