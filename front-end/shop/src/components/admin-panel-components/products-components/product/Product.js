import React, { Fragment } from "react";
import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout";

import { validatorService } from "../../../../services/validator-services";
import { useSelector } from 'react-redux'

import {  adminFetchProduct } from '../../../../store/admin/admin-actions/product-actions'
import { resetProduct } from '../../../../store/admin/admin-reducers/product-reducer'


export default function Product () {
    const {product, isLoading, error} = useSelector(state=>state.adminProduct)

    return (
        <DetailBody error={error} loading={isLoading} fetch={adminFetchProduct} reset={resetProduct}>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>ID</div>
                <div className='admin__detail-value'>{product.id}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Назва</div>
                <div className='admin__detail-value'>{product.name}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Опис</div>
                <div className='admin__detail-value'>{product.id}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Картинка</div>
                <div className='admin__detail-value'>{product.picture}</div>
                <img src={process.env.REACT_APP_BACK_END_HOST + '/' + product.picture} alt="Головна картинка"/>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Ціна</div>
                <div className='admin__detail-value'>{product.price}</div>
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
                <div className='admin__detail-name'>В продажі</div>
                <div className='admin__detail-value'>{product.avaliable ? 'Так' : 'Ні'}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Додаткові фото</div>
                <div className='admin__detail-value'>
                    { product.pictures?.length ?
                        product.pictures.map(item=>{
                            return(
                                <Fragment key={item.id}>
                                    <span>{item.name}</span>
                                    <img src={item.picture} alt='Додаткове фото'/>
                                </Fragment>
                                
                            )
                        })
                        :
                        'Додаткові фото відстуні'
                    }
                </div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Категорія</div>
                <div className='admin__detail-value'>{product.category?.name}</div>
            </div>
        </DetailBody>
)
}