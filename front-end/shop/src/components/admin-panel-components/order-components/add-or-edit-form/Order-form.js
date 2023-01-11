import React, { useState, useEffect } from "react"
import FormsLayout from "../../ui-components/forms-layout/Forms-layout"
import { orderServices } from "../../../../services/admin-services/order-service"

import styles from './order-form.module.css'

export default function OrderForm ({children, sendData, defaultData, currentData = '', productWithoutBox = [] }) {
    const [data, setData] = useState(defaultData || {...currentData})
    const [a, setA] = useState(productWithoutBox)
    const [productName, setProductName] = useState({})
    const [boxName, setBoxName] = useState({})
    const [products, setProducts] = useState([])
    const [productsForChoose, setProductsForChoose] = useState([])
    const [boxes, setBoxes] = useState([])

    const saveData = (key) => (e) => {
        const copy = {...data}
        const value = e.target.value
        copy[key] = value
        setData(copy)
    }

    const addProduct = (e) => {
        e.preventDefault()
        const copy = [...products, {}]
        setProducts(copy)
    }

    const addBoxes = (e) => {
        e.preventDefault()
        if(!productsForChoose.length || boxes.length >= productsForChoose.length) return
        const copy = [...boxes, {}]
        setBoxes(copy)
    }

    const removeItem = (array, set, index) => (e) => {
        e.preventDefault()
        if(array === products) {
            const product = array[index]
            for(let i = 0; i < boxes.length; i++) {
                if(boxes[i].productId === product.productId){
                    const newBoxes = boxes.filter(item=>boxes.indexOf(item) !== i)
                    setBoxes(newBoxes)
                }
            }
        }
            const copy = array.filter(item=>array.indexOf(item) !== index)
            set(copy)
    }

    const chooseProduct = (index) => async(e) => {
        try {
            e.preventDefault()
            const searchParams = new URLSearchParams(productName)
            const response = await orderServices.findProduct(searchParams)
            if(response.error) {
                throw new Error(response.error)
            }
            const product = {
                productId: response.result.id,
                name: response.result.name,
                quantity: 1,
                price: response.result.price,
            }
            const copy = [...products]
            copy[index] = product
            setProducts(copy)
        } catch (e) {
            alert(e.message)
        }
    }

    const chooseProductInBox = (index) => (e) => {
        const value = e.target.value
        const copy = [...boxes]
        copy[index] = JSON.parse(value)
        setBoxes(copy)
    }

    const chooseBox = (index) => async (e) => {
        try {
            e.preventDefault()
            const searchParams = new URLSearchParams(boxName)
            const response = await orderServices.findProduct(searchParams)
            if(response.error){
                throw new Error(response.error)
            }
            const copy = [...boxes]
            copy[index].boxName = response.result.name
            copy[index].boxId = response.result.id
            copy[index].price = response.result.price
            setBoxes(copy)
        } catch (e) {
            alert(e.message)
        }
    }

    useEffect(()=>{
        setProductsForChoose([...products, ...a])
    },[products, a])

    useEffect(()=>{
        const copy = {...data}
        copy.orderedProducts = products.filter(item=>item.hasOwnProperty('productId'))
        copy.choosedBox = boxes.filter(item=>item.hasOwnProperty('boxName') && item.hasOwnProperty('productId'))
        setData(copy)
    },[products, boxes])

    return (
        <FormsLayout sendData={sendData} data={data}>
            <label id="admin__firstName" className="admin__label">Ім'я</label>
            <input defaultValue={currentData.firstName} id="admin__firstName" onChange={saveData('firstName')} className="admin__input"/>

            <label id="admin__lastName" className="admin__label">Прізвище</label>
            <input defaultValue={currentData.lastName} id="admin__lastName" onChange={saveData('lastName')} className="admin__input"/>

            <label id="admin__patronymic" className="admin__label">По батькові</label>
            <input defaultValue={currentData.patronymic} id="admin__patronymic" onChange={saveData('patronymic')} className="admin__input"/>

            <label id="admin__telephone" className="admin__label">Телефон</label>
            <input defaultValue={currentData.telephone} id="admin__telephone" onChange={saveData('telephone')} className="admin__input"/>

            <label id="admin__street" className="admin__label">Вулиця</label>
            <input defaultValue={currentData.street} id="admin__street" onChange={saveData('street')} className="admin__input"/>

            <label id="admin__building" className="admin__label">Будинок</label>
            <input defaultValue={currentData.building} id="admin__building" onChange={saveData('building')} className="admin__input"/>

            <label id="admin__sector" className="admin__label">Під'їзд</label>
            <input defaultValue={currentData.sector} id="admin__sector" onChange={saveData('sector')} className="admin__input"/>

            <label id="admin__payment" className="admin__label">Сплата</label>
            <input defaultValue={currentData.payment || data.payment} id="admin__payment" onChange={saveData('payment')} className="admin__input"/>

            <label id="admin__comment" className="admin__label">Коментар</label>
            <input defaultValue={currentData.comment} id="admin__comment" onChange={saveData('comment')} className="admin__input"/>

            { products &&
                products.map((item, index)=>{
                    return (
                        <div className={styles.productItem} key={index}>
                            <button onClick={removeItem(products, setProducts,index)} className={styles.productButton}>X</button>
                            <div className={styles.productContent}>   
                                <input onChange={(e)=>setProductName({name:e.target.value})} id={styles.productInput} className="admin__input" placeholder="Введіть назву товару"/>
                                <button onClick={chooseProduct(index)} className={styles.productChoosed}>Обрати</button>
                            </div>
                            <p className={styles.productSelected}>Обрано: {item.name || ''}</p>
                        </div>
                    )
                })
            }
            <button className={styles.sendButton} onClick={addProduct}>Додати товар</button>

            {boxes &&
                boxes.map((item, index)=>{
                    return (
                        <div className={styles.productItem} key={index}>
                             <button onClick={removeItem(boxes, setBoxes, index)} className={styles.productButton}>X</button>
                             <select onChange={chooseProductInBox(index)} className={styles.boxSelect}>
                                <option value=''>----</option>
                                {productsForChoose &&
                                    productsForChoose.map((item)=>{    
                                        return <option key={item.productId} value={JSON.stringify({productId:item.productId, productName:item.name})}>{item.name}</option>
                                    })
                                }
                            </select>
                            <div className={styles.productContent}>
                                <input className={styles.boxInput} onChange={e=>setBoxName({name:e.target.value})} placeholder="Введіть назву коробки" />
                                <button onClick={chooseBox(index)} className={styles.productChoosed}>Обрати</button>
                            </div>
                            <p className={styles.boxName}>Коробка - {item.boxName || ''}</p>
                        </div>
                    )
                })
            }
             <button className={styles.sendButton} onClick={addBoxes}>Обрати упаковку</button>
             {children}
        </FormsLayout>
    )
}