import React, {useState} from "react";
import OrderForm from '../add-or-edit-form/Order-form'
import styles from "./order-edit.module.css"

import { validatorService } from "../../../../services/validator-services";
import { orderServices } from "../../../../services/admin-services/order-service";

export default function OrderEdit({order, productWithoutBox}) {
    const [product, setProduct] = useState([])
    const [box, setBox] = useState([])

    const sendData = (data) => async(e) => {
        e.preventDefault()
        try {
            const copy = {...data}
            let changedProducts = [...product, ...copy.orderedProducts]
            let changedBox = [...box, ...copy.choosedBox]
            let sendData = {orderInfo:{}}
            // Якщо є нові товари, додаємо їх перед перевіркою на зміну даних
            copy.orderedProducts = changedProducts.length ? changedProducts : order.orderedProducts
            copy.choosedBox = changedBox.length ? changedBox : order.choosedBox
            const changedData = validatorService.checkIfDataChanged(order, copy)
            if(!changedData) {
                throw new Error('Дані не змінилися')
            }
            for(let key in changedData) {
                if(key === 'orderedProducts' || key === 'choosedBox'){
                    sendData[key] = changedData[key]
                }
                else{
                    sendData.orderInfo[key] = changedData[key]
                }
            }
            const confirmation = window.confirm('Редагувати дані?')
            if(confirmation){
                const response = await orderServices.updateOrder(order.id, sendData)
                if(response.result) {
                    window.location.reload(false)
                }
                if(response.error) throw new Error(response.error)
            }
        } catch (e) {
            alert(e.message)
        }
    }

    const chooseProduct = (itemId, productId, className) => e => {
        e.preventDefault()
        e.target.classList.toggle(className)
        const choosedProduct = product.find(({id})=> id === itemId)
        const choosedBox = box.find(({product}) => product === productId)
        if(choosedProduct) {
            if(choosedBox){
                const button = document.getElementById(`${productId}box-button`)
                button.classList.toggle(className)
                button.disabled = false
                box.splice(product.indexOf(choosedBox), 1)
            }
            product.splice(product.indexOf(choosedProduct), 1)
            return 
        }
        for(let currentBox of order.choosedBox) {
            if(currentBox.productId === productId && box.find(({id}) => id === currentBox.id) === undefined) {
                const button = document.getElementById(`${productId}box-button`)
                button.classList.toggle(className)
                button.disabled = true
                setBox([...box, {delete:true, id:currentBox.id, product:productId}])
            }
        }
        if(choosedBox !== undefined) {
            const button = document.getElementById(`${productId}box-button`)
            button.disabled = true
        }
        setProduct([...product, {delete:true, id:itemId}])
    }

    const chooseBox = (itemId, productId, className) => (e) => {
        e.preventDefault()
        e.target.classList.toggle(className)
        const item = box.find(({id})=> id === itemId)
        if(item){
            box.splice(box.indexOf(item), 1)
            return
        }
        setBox([...box, {delete:true, id:itemId, product:productId}])
    }


    return(
        <OrderForm sendData={sendData} currentData={order} productWithoutBox={productWithoutBox}>
            <p className={styles.description}>Оберіть товар для видалення</p>
            <p className={styles.contentTitle}>Замовленні товари</p>
            {
                order.orderedProducts.map((item)=>{
                    return(
                        <div className={styles.orderedProduct} key={item.id}>
                            <div className={styles.content}>
                                <p className={styles.title}>Назва товару</p>
                                <p className={styles.item}>{item.name}</p>
                                <p className={styles.title}>ID товару</p>
                                <p className={styles.item}>{item.productId}</p>
                            </div>
                            <button onClick={chooseProduct(item.id, item.productId, styles.choosed)} className={styles.delete}></button>
                        </div>
                    )
                })
            }
            <p className={styles.contentTitle}>Пакунки товарів</p>
            {
                order.choosedBox.map(item=>{
                    return (
                        <div className={styles.orderedProductBox} key={item.id}>
                            <div className={styles.content}>
                                <p className={styles.title}>Назва коробки</p>
                                <p className={styles.item}>{item.boxName}</p>
                                <p className={styles.title}>Назва товару</p>
                                <p className={styles.item}>{item.productName}</p>
                                <p className={styles.title}>ID товару</p>
                                <p className={styles.item}>{item.productId}</p>
                            </div>
                            <button id={item.productId+'box-button'} onClick={chooseBox(item.id, item.productId, styles.choosed)} className={styles.delete}></button>
                        </div>
                    )
                })
            }
        </OrderForm>
    )
}