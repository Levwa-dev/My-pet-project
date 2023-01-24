import React, {Fragment, useState } from "react";
import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout";
import ProductEdit from "../product-edit/Product-edit";
import style from './product.module.css'

import { validatorService } from "../../../../services/validator-services";
import { productService } from "../../../../services/admin-services/product-service";
import { useSelector } from 'react-redux'

import {  adminFetchProduct } from '../../../../store/admin/admin-actions/product-actions'
import { resetProduct } from '../../../../store/admin/admin-reducers/product-reducer'


export default function Product () {
    const {product, categories, isLoading, error} = useSelector(state=>state.adminProduct)
    const [photos, setPhotos] = useState(false)
    const [data, setData] = useState([])

    const savePhotos = (e) => {
        const photos = e.target.files
        setData([...data, ...photos])
    }
    const cancelUploadingPhotos = () => {
        setData([])
        setPhotos(!photos)
    }

    const removePhoto = (index) => (e) => {
        e.preventDefault()
        const newImagesSet = data.filter((item)=>data.indexOf(item) !== index)
        setData(newImagesSet)
    }

    const sendData = async(e) => {
        e.preventDefault()
        try {
            if(!data.length) return
            let formData = new FormData()
            for(let photo of data) {
                formData.append('picture', photo)
            }
            const response = await productService.uploadPhotos(product.id, formData)
            if(response.result) {
                alert("Фото заванаженні")
                window.location.reload(false)
            }
            if(response.error) alert (response.error)
        } catch (e) {
            alert("Помилка заванатження фотографій, спробуйте пізніше!")
        }
    }

    return (
        <DetailBody error={error} 
                    loading={isLoading} 
                    fetch={adminFetchProduct} 
                    reset={resetProduct} 
                    deleteFunction={productService.deleteProduct}
                    editForm={<ProductEdit product={product} categories={categories}/>}>
            <button onClick={cancelUploadingPhotos} className={style.addPhotos}>{!photos ? 'Додати додаткові фото' : 'Скасувати'}</button>
            { !photos &&
            <>
                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>ID</div>
                    <div className='admin__detail-value'>{product.id}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Назва</div>
                    <div className='admin__detail-value'>{product.name}</div>
                </div>

                <div id={style.productDescriptionContent} className='admin__detail-content'>
                    <div className='admin__detail-name'>Опис</div>
                    <div id={style.productDescription} className='admin__detail-value' dangerouslySetInnerHTML={{__html:product.description}}/>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Картинка</div>
                    <div className='admin__detail-value'>{product.picture}</div>
                    {product.picture && <img className="admin__detail-image" src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/' + product?.picture} alt="Головна картинка"/>}
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Додано</div>
                    <div className='admin__detail-value'>{validatorService.setLocaleTime(product.date)}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Знижка</div>
                    <div className='admin__detail-value'>{product.sale ? 'Так' : 'Ні'}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Стара ціна</div>
                    <div className='admin__detail-value'>{product.oldPrice ? product.oldPrice : '-----'}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Ціна</div>
                    <div className='admin__detail-value'>{product.price}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>В продажі</div>
                    <div className='admin__detail-value'>{product.avaliable ? 'Так' : 'Ні'}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Найкраща пропозиція</div>
                    <div className='admin__detail-value'>{product.bestOffer ? 'Так' : 'Ні'}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Категорія</div>
                    <div className='admin__detail-value'>{product.category?.name}</div>
                </div>

                <div className='admin__detail-content'>
                    <div className='admin__detail-name'>Додаткові фото</div>
                    <div className='admin__detail-value'>
                        { product.pictures?.length ?
                            product.pictures.map(item=>{
                                return(
                                    <Fragment key={item.id}>
                                        <p className={style.detailPhoto}>{item.picture}</p>
                                        <img className="admin__detail-image" src={process.env.REACT_APP_BACK_END_HOST + '/product-photo/product-detail-photo/' + item.picture} alt='Додаткове фото'/>
                                    </Fragment>        
                                )
                            })
                            :
                            'Додаткові фото відстуні'
                        }
                    </div>
                </div>
        </>         
        }   
        {  photos &&
        <div className={style.photosContainer}>
            <form className={style.photosForm}>
                <label className={style.photosLabel} htmlFor={style.photos}>Обрати фото</label>
                <input onChange={savePhotos} className="admin__input" id={style.photos} type='file' accept="image/*" multiple />
                { data &&
                    data.map((item, index)=>{
                        return (
                            <div key={index} className={style.selectedPhotosList}>
                                <div className={style.selectedPhotos}>{item.name}</div>
                                <button onClick={removePhoto(index)} className={style.removePhoto}>X</button>
                            </div>
                            
                        )
                    })
                }
                <button onClick={sendData} className={style.submit}>Підтвердити</button>
            </form>
        </div>  
        }
        </DetailBody>
    )
}