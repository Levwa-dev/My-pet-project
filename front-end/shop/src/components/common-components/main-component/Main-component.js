import React, {useEffect} from "react"
import ServiceComponent from "./service-component.js/Service-component"
import BestOffer from "./best-offer-component/Best-offer"
import OurOffers from "./our-offers-component/Our-offers"
import ErrorOccurred from "../error-component/Error-occurred"
import LoadingComponent from "../loading/Loading"

import { useDispatch, useSelector } from "react-redux"
import { getMainPageProducts } from "../../../store/common/common-actions/main-page-action"

import styles from './main-component.module.css'
import { Link } from "react-router-dom"
import mainPhoto from "../../../images/main_photo.png"

export default function MainComponent () {
    const dispatch = useDispatch()
    const {products, bestOffer, error, loading} = useSelector(state=> state.mainPage)

    useEffect(()=>{
        dispatch(getMainPageProducts())
    },[])
  
    return (
        <main>
            { error ?
                <div className={styles.loadingOrErrorBody}>
                    <ErrorOccurred error={error}/>
                </div>
                :
                loading ?
                    <div className={styles.loadingOrErrorBody}>
                         <LoadingComponent/>
                    </div>
                    :
                    <>
                        <section className={styles.mainInfo}>
                            <div className="wrapper">
                                <div className={styles.mainContainer}>
                                    <div className={styles.mainText}>
                                        <h1 className={styles.mainTitle}>Дуже спекотно? Замовляй морозиво до <span className={styles.mainHighlight}>власних дверей</span> !</h1>
                                        <p className={styles.mainText}>Тільки у нас ви знайдете найкраще морозиво в цьому місті.Тільки у нас ви знайдете найкраще морозиво в цьому місті.Тільки у нас ви знайдете найкраще морозиво в цьому місті.Тільки у нас ви знайдете найкраще морозиво в цьому місті.Тільки у нас ви знайдете найкраще морозиво в цьому місті.</p>
                                        <a className={styles.mainLink} href={'#offers'}>Купити зараз</a>
                                    </div>
                                    <img className={styles.mainPhoto} src={mainPhoto} alt="Головне фото"/>
                                </div>
                            </div>
                        </section>
                        <ServiceComponent/>
                        <BestOffer bestOffer={bestOffer}/>
                        <OurOffers products={products}/>
                    </>
            }
        </main>
    )
}