import React from "react";

import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout";
import CategoryEdit from "../category-edit/Category-edit";

import { useSelector } from 'react-redux'

import { categoryService } from "../../../../services/admin-services/category-service";
import { adminFetchCategory } from '../../../../store/admin/admin-actions/category-actions'
import { resetCategory } from "../../../../store/admin/admin-reducers/category-reducer";


export default function AdminCategory () {
    const {category, isLoading, error} = useSelector(state=>state.adminCategory)

    return (
        <DetailBody error={error} 
                    loading={isLoading}
                    reset={resetCategory} 
                    fetch={adminFetchCategory}
                    deleteFunction={categoryService.deleteCategory}
                    editForm = {<CategoryEdit category={category}/>}>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>ID</div>
                <div className='admin__detail-value'>{category.id}</div>
            </div>
            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Назва</div>
                <div className='admin__detail-value'>{category.name}</div>
            </div>
        </DetailBody>
    )
}