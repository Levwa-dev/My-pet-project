import React, {Fragment, useState} from "react";
import { productService } from '../../../../services/admin-services/product-service'
import { validatorService } from "../../../../services/validator-services";

import style from './product-edit.module.css'

import ProductForm from '../add-or-edit-form/Product-form'

export default function ProductEdit ({product, categories}) {
    const [images, setImages] = useState([])

    const sendData = (data) => async (e) => {
        e.preventDefault()
        try {
            let copy = {...data}
            images.length ?
                copy.picturesForDeleting = images
                :
                delete copy?.picturesForDeleting
            const changedData = validatorService.checkIfDataChanged(product, copy) //Перевіряємо, які поля змінились
            if(!changedData) {
                alert("Дані не змінились")
                return
            }
            let formData = new FormData()
            for(let key in changedData) {
                key === 'picturesForDeleting' ?
                    formData.append(key, JSON.stringify(changedData[key]))
                    :
                    formData.append(key, changedData[key])
            }
            const confirmation = window.confirm("Редагувати дані?")
            if(confirmation) {
                const response = await productService.editProduct(product.id, formData)
                if(response.result) {
                    window.location.reload(false)
                }
                if(response.error) alert(response.error)
            }
        } catch (e) {
            alert("Помилка редагування, спробуйте пізніше")
        }
    }

    const chooseImage = (picture, className) => (e) => {
        e.preventDefault()
        e.target.classList.toggle(className)
        if(images.includes(picture)){
            images.splice(images.indexOf(picture), 1)
            return
        }
        const newImages = [...images, picture]
        setImages(newImages)
    }

    return (
        <ProductForm sendData={sendData} currentData={product} categories={categories}>
            <div className='admin__label'>Оберіть фото для видалення</div>
                <div className={style.mainBody}>
                    { product.pictures?.length ?
                        product.pictures.map(item=>{
                            return(
                                <Fragment key={item.id}>
                                    <p className={style.photo}>{item.picture}</p>
                                    <div className={style.container}>
                                        <img className="admin__detail-image" src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/product-detail-photo/' + item.picture} alt='Додаткове фото'/>
                                        <button onClick={chooseImage(item.picture, style.active)} className={style.deleteButton}></button>
                                    </div>
                                </Fragment>        
                            )
                        })
                        :
                        'Додаткові фото відстуні'
                    }
            </div>
        </ProductForm>
    )
}