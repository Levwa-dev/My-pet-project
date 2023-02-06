import React, {useEffect, useState} from "react";
import styles from "./deliver.module.css"
import Thanks from "../thanks-component/Thanks";

import { resetCart } from "../../../../store/common/common-reducers/cart-reducer";
import { useDispatch} from "react-redux"
import { useNavigate, Link } from "react-router-dom";

import { cartService } from "../../../../services/common-services/cart-service";
import { validatorService } from "../../../../services/validator-services";
import { MAIN } from "../../../../utils/consts";

export default function Deliver () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [date, setDate] = useState({currentDate:'', minDate:''})
    const [orderInfo, setOrderInfo] = useState({payment:"Готівка", telephone:'', sector:''})
    const [order, setOrder] = useState({})
    const [ordered, setOrdered] = useState(false)

    const chooseDate = (e) => {
        const copyDate = {...date}
        const copyOrderInfo = {...orderInfo}
        const currentDate = e.target.value
        setDate({...copyDate, currentDate})
        setOrderInfo({...copyOrderInfo, deliveryDate: currentDate})
    }

    const submit = async(e)=> {
        e.preventDefault()
        try {
            const validationSucces = validatorService.validateDeliveringForm("delivering-form")
            if(validationSucces && order.hasOwnProperty('orderedProducts')){
                const content = {
                    orderInfo,
                    orderedProducts: order.orderedProducts,
                    choosedBox: order.chooseBox
                }
                await cartService.makeOrder(content)
                localStorage.removeItem('order')
                localStorage.removeItem('cart')
                dispatch(resetCart())
                window.scrollTo(0,0)
                setOrdered(true)
            }
        } catch (e) {
            alert(e.response.data.error || 'Виникла помилка, спробуйте пізніше')
        }
    }

    const saveOrderInfo = (key) => (e) => {
        const copy = {...orderInfo}
        let value= e.target.value
        if(key === 'telephone' || key === 'sector') {
            value = value.replace(/\D/g, '')
        }
        copy[key] = value
        setOrderInfo(copy)
    }

    useEffect(()=>{
        const order = JSON.parse(localStorage.getItem('order'))
        if(!order) {
           navigate(MAIN) 
        }
        else {
            order.chooseBox = order.chooseBox.filter(item=>item.productId !== 0)
                            .map(item=>{
                                    delete item.id
                                    return item
                                })
            const currentDate = cartService.getDateForInput()
            setOrder(order)
            setDate({currentDate, minDate:currentDate})
            setOrderInfo({...orderInfo, deliveryDate:currentDate})
        }
    },[])

    if(ordered) {
        return (
           <Thanks/>
        )
    }
    return (
        <main className={styles.mainBody}>
            <div className="wrapper">
                <h1 className={styles.title}>Дані для доставки</h1>
                <form className={styles.formBody} role="form" name="delivering-form">
                    <label className={styles.labels} htmlFor={styles.name}>Ім'я</label>
                    <input role="firstName" type="text" id={styles.name} onChange={saveOrderInfo('firstName')}/>

                    <label className={styles.labels} htmlFor={styles.lastName}>Прізвище</label>
                    <input role="lastName" type="text" id={styles.lastName} onChange={saveOrderInfo('lastName')}/>

                    <label className={styles.labels}  htmlFor={styles.street}>Вулиця</label>
                    <input role="street" type="text" id={styles.street} onChange={saveOrderInfo('street')}/>

                    <label className={styles.labels} htmlFor={styles.building}>Будинок</label>
                    <input role="building" type="text" id={styles.building} onChange={saveOrderInfo('building')}/>

                    <label className={styles.labels} htmlFor={styles.sector}>Під'їзд</label>
                    <input role="sector" type="text" value={orderInfo.sector} id={styles.sector} onChange={saveOrderInfo('sector')}/>

                    <label className={styles.labels} htmlFor={styles.telephone}>Номер телефону</label>
                    <input role="telephone" type="tel" style={{letterSpacing:"5px"}} id={styles.telephone} value={orderInfo.telephone} placeholder="380 50 505 0505" onChange={saveOrderInfo('telephone')}/>

                    <label className={styles.labels} htmlFor={styles.date}>Дата доставки</label>
                    <input role="date" type="date" id={styles.date} value={date.currentDate} onChange={chooseDate} min={date.minDate}/>

                    <label className={styles.labels} htmlFor={styles.time}>Час доставки</label>
                    <span className={styles.workTime}>Ми працюємо з 09:00 до 19:00</span>
                    <input role="time" type="time" onChange={saveOrderInfo('time')} id={styles.time} min='09:00' max='19:00'/>

                    <p className={styles.labels}>Спосіб сплати</p>
                    <div className={styles.paymentContainer}>
                        <label className={styles.container}>
                            <input role="cash" defaultChecked  onChange={saveOrderInfo('payment')} value="Готівка" type="radio" name="payment"/>
                            Готівкою
                            <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.container}>
                            <input role="card" onChange={saveOrderInfo('payment')} value="Картка" type="radio" name="payment"/>
                            Карткою кур'єру
                            <span className={styles.checkmark}></span>
                        </label>
                    </div>

                    <textarea role="comment" onChange={saveOrderInfo('comment')} placeholder="Додати коментар"></textarea>

                    <button onClick={submit} className={styles.orderBtn}>Замовити</button>
                </form>
            </div>
        </main>
    )
}