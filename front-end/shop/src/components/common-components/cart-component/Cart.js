import React, { useEffect, useState } from "react"
import styles from "./cart.module.css"
import trash_bucket from "../../../images/trash_bucket.png"

import CartQuantityBtn from "../ui-components/buttons/cart-quantity-btn/CartQantityBtn"
import {useSelector, useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { PRODUCT_LIST, CART_DELIVER } from "../../../utils/consts"
import { cartService} from "../../../services/common-services/cart-service"
import { increaseQuantityOfProducts,  decreaseQuantityOfProducts, removeProduct } from "../../../store/common/common-reducers/cart-reducer"

export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {boxCategory} = useSelector(state=>state.commonProducts)
    const {orderedProduct} = useSelector(state=>state.cart)
    const [orderData, setOrderData] = useState({orderedProducts:[], chooseBox:[]})

    const increaseAction = (item) => () => {
        if(item.categoryId === boxCategory.id && orderData.orderedProducts.length <= orderData.chooseBox.length) return
        dispatch(increaseQuantityOfProducts({item}))
    }

    const decreaseAction = (item) => () => {
        if(orderData.chooseBox.length >= orderData.orderedProducts.length && item.categoryId !== boxCategory.id) {
            alert("Спочатку приберіть зайві контейнери")
            return
        }
        const choosedProducts = orderData.chooseBox.filter(box=>box.productId === item.id).length
        if(choosedProducts === item.quantity) {
            const lastChoosedBox = orderData.chooseBox.map(box=>box.productId).lastIndexOf(item.id)
            const copy = {...orderData}
            setOrderData({...copy, chooseBox: copy.chooseBox.splice(lastChoosedBox,1)})
        }
        dispatch(decreaseQuantityOfProducts({item}))
    }

    const removeProductAction = (product) => () => {
        const copy = {...orderData}
        let boxList = copy.chooseBox
        if(product.categoryId === boxCategory.id){
            boxList = boxList.filter(item=> item.boxId !== product.id)
        }
        else {
            boxList = boxList.map(item=>{
                if(item.productId === product.id){
                    const copyItem = {...item}
                    return item = {...copyItem, productId:0, productName:''}
                }
                return item
            })
        }
        setOrderData({...copy, chooseBox:boxList})
        dispatch(removeProduct({product, boxCategory}))
    }

    const selectBox = (product, index) => ({target}) => {
        const copy = {...orderData}
        const quantityBoxWithCurrentProduct = copy.chooseBox.filter(item => item.productId === product.id).length
        if(quantityBoxWithCurrentProduct === product.quantity){
            target.checked = false
            alert("Ви вже обрали пакунок для цього продукту")
            return
        }
        const copyBox = {...orderData.chooseBox[index]}
        const productInBox = {...copyBox, productId:product.id, productName:product.name}
        copy.chooseBox[index] ? 
            copy.chooseBox.splice(index, 1, productInBox)
            :
            copy.chooseBox = [...copy.chooseBox, productInBox]
        setOrderData(copy)
    }

    const getDefaultLists = (array, item, template) => {
        for(let i = 1; i <= item.quantity; i++){
            template.hasOwnProperty('boxId') ?
                array.push({...template, id:i})
                :
                array.push(template)
        }
    }

    const setOrder = () => {
        const order = JSON.stringify(orderData)
        localStorage.setItem('order', order)
        navigate(CART_DELIVER)
    }

    useEffect(()=>{
        const order = JSON.parse(localStorage.getItem('order'))
        if(order) {
            localStorage.removeItem('order')
            setOrderData(order)
        }
        else {
            let boxList = []
            const products = []
            const copyOrderData = {...orderData}
            let id = 0
            for(let item of orderedProduct) {
                if(item.categoryId !== boxCategory?.id) {
                    const product = {productId:item.id, price:item.price, name:item.name}
                    getDefaultLists(products, item, product)
                }
                else {
                    const box = {boxId:item.id, boxName:item.name, price:item.price, productId:0, productName:''}
                    getDefaultLists(boxList, item, box, id)
                }
            }
            for(let item of copyOrderData.chooseBox) { // Заповнюємо вже обрані контейнери, при зміні їх кількості
                if(item.productId !== 0){
                    const currentBox = boxList.map(el=>el.id === item.id && el.boxId === item.boxId)
                    if(currentBox.length){
                        boxList[currentBox.indexOf(true)] = item
                    }
                }
            }
            setOrderData({orderedProducts: products, chooseBox:boxList})
        }
    },[boxCategory, orderedProduct])

    if(!orderedProduct.length){
        return (
            <main className={styles.mainBody}>
                <div className="wrapper">
                    <h1 className={styles.empty}>Кошик пустий. Спочатку оберіть товар</h1>
                </div>
            </main>
        )
    }
    return(
        <main className={styles.mainBody}>
            <div className="wrapper">
                <h1 className={styles.title}>Ваше замовлення</h1>
                <ul className={styles.list}>
                    { orderedProduct.map(item=>{
                        return (
                            <li className={styles.listItem} key={item.id}>
                                <img className={styles.productImage} src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + item.picture} alt='Фото товару'/>
                                <p className={styles.productName}>{item.name}</p>
                                <div className={styles.buttons}>
                                    <CartQuantityBtn action={decreaseAction(item)}>—</CartQuantityBtn>
                                    <p className={styles.quantity}>{item.quantity}</p>
                                    <CartQuantityBtn action={increaseAction(item)}>+</CartQuantityBtn>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
                <h2 className={styles.titleFoBox}>Заміни стандартний нудний контейнер, та подаруй <span className={styles.textInTitle}>додаткові емоції!</span></h2>
                <Link className={styles.addBox} to={PRODUCT_LIST +'/'+ boxCategory?.id}>Обрати цікавий пакунок</Link>
                <div className={styles.orderListsContainer}>
                    <div>
                        <h2 className={styles.orderedTitle} >Замовлені товари</h2>
                        <ul className={styles.orderedList}> 
                            {
                                orderedProduct.map(item => {
                                    if(item.categoryId !== boxCategory?.id){
                                        return(
                                            <li className={styles.orderedListContent} key={item.index}>
                                                <div className={styles.orderedInfo}>
                                                    <p className={styles.orderedName}>{`- ${item.name}`}</p>
                                                    <p className={styles.orderedPrice}>{item.price?.toFixed(2)} грн.</p>
                                                </div>
                                                <div className={styles.quantityOfProducts}>X {item.quantity}</div>
                                                <img onClick={removeProductAction(item)} className={styles.delete} src={trash_bucket} alt='Delete'/>
                                            </li>
                                        )
                                    }
                                    return null
                                })
                            }
                        </ul>
                    </div>
                    { orderData.chooseBox.length ? 
                        <div className={styles.containersList}>
                            <h2 className={styles.orderedTitle}>Контейнери</h2>
                            <ul className={styles.orderedList}> 
                                {
                                     orderedProduct.map(item => {
                                        if(item.categoryId === boxCategory?.id){
                                            return(
                                                <li className={styles.orderedListContent} key={item.index}>
                                                    <div className={styles.orderedInfo}>
                                                        <p className={styles.orderedName}>{`- ${item.name}`}</p>
                                                        <p className={styles.orderedPrice}>{item.price?.toFixed(2)} грн.</p>
                                                    </div>
                                                    <div className={styles.quantityOfProducts}>X {item.quantity}</div>
                                                    <img onClick={removeProductAction(item)} className={styles.delete} src={trash_bucket} alt='Delete'/>
                                                </li>
                                            )
                                        }
                                        return null
                                    })
                                }
                            </ul>
                        </div>
                        :
                        null
                    }
                </div>
                <h3 className={styles.chooseBox}>Загальна вартість замовлення</h3>
                <p className={styles.totalPrice}>{cartService.getTotalPrice(orderedProduct)} грн.</p>
                <ul className={styles.chooseBoxList}>
                    { orderData.chooseBox.map((box, index)=>{
                        return (
                            <li key={index} className={styles.productForChooseList}>
                                <h3 className={styles.chooseBox}>До контейнера <span className={styles.containerName}>"{box.boxName}"</span> покласти</h3>
                                <div>
                                    {   orderedProduct.map(product=>{
                                            if(product.categoryId !== boxCategory?.id){
                                                return(
                                                    <label  key={product.id} className={styles.checkLabel}>
                                                        <input value={product.id} checked={orderData?.chooseBox[index]?.productId === product.id} onChange={selectBox(product, index)} type="radio"/>
                                                        {product.name}
                                                        <span className={styles.checkmark}></span>
                                                    </label>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
                <button onClick={setOrder} className={styles.deliverBtn}>Далі</button>
            </div>
        </main>
    )
}