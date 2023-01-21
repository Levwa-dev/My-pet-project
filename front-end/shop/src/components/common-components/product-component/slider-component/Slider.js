import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css"

export default function SlickSlider({mainPhoto, pictures=[]}) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: () => <button className={styles.dot}></button>,
        dotsClass: styles.dots
      };

    return (
        <div className={styles.content}>
            <Slider {...settings}>
                <div>
                    <img role={'main-picture'} className={styles.picture} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + mainPhoto} alt={"Фото продукту"}/>
                </div>
                    {pictures.map(item=>{
                        return (
                            <div className={styles.slide} key={item.id}>
                                     <img  className={styles.picture} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/product-detail-photo/' + item.picture} alt={"Фото продукту"}/>
                            </div>
                        )
                    })}
            </Slider>
        </div>
    )
}