import React from "react";
import styles from './best-offer.module.css'

import { PRODUCT } from "../../../../utils/consts"
import { Link } from "react-router-dom";

export default function BestOffer ({bestOffer={}}) {
    return (
        <>
            {   bestOffer &&
                <section className={styles.bestOffer}>
                    <div className="wrapper">
                        <div className={styles.container}>
                            <div className={styles.info}>
                                <h2 className={styles.name}>{bestOffer.name}</h2>
                                <p className={styles.description}>{bestOffer.description}</p>
                                <Link className={styles.detailLink} to={PRODUCT+'/'+bestOffer.id}>Детальніше</Link>
                            </div>
                            { bestOffer.picture &&
                                <img className={styles.image} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + bestOffer.picture} alt="Найкраща пропозиція"/>
                            }
                        </div>
                    </div>
                </section>    
            }
        </>
    )
}