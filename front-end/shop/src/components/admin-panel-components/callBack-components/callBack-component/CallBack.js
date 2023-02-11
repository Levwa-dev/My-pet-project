import React from "react";

import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout";

import { validatorService } from "../../../../services/validator-services"

import { useSelector } from 'react-redux'
import { fetchCallBack } from "../../../../store/admin/admin-actions/callBack-actions";
import { callBackService } from "../../../../services/admin-services/callBack-service";
import { resetRecord } from "../../../../store/admin/admin-reducers/callBack-reducer";


export default function CallBack () {
    const {record, isLoading, error} = useSelector(state=>state.adminCallBack)
    return (
        <DetailBody error={error} 
                    loading={isLoading}
                    reset={resetRecord} 
                    fetch={fetchCallBack}
                    deleteFunction={callBackService.deleteCallBack}>
            
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>ID</div>
                <div className='admin__detail-value'>{record.id}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Ім'я</div>
                <div className='admin__detail-value'>{record.firstName}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Прізвище</div>
                <div className='admin__detail-value'>{record.lastName}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Телефон</div>
                <div className='admin__detail-value'>{record.number}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Спосіб комунікації</div>
                <div className='admin__detail-value'>{record.call}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Створенно</div>
                <div className='admin__detail-value'>{validatorService.setLocaleTime(record.date)}</div>
            </div>
        </DetailBody>
    )
}