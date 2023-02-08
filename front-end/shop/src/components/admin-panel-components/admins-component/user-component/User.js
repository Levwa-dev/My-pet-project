import React from "react";
import DetailBody from "../../ui-components/detail-body-layout/Detail-body-layout";
import UserEdit from "../user-edit/User-edit";

import { useSelector } from "react-redux"
import { fetchUser } from "../../../../store/admin/admin-actions/users-actions";
import { resetUser } from "../../../../store/admin/admin-reducers/user-reducer";
import { validatorService } from "../../../../services/validator-services";
import { userService } from "../../../../services/admin-services/user-service";

export default function UserComponent () {
    const {user, error, isLoading} = useSelector(state=>state.adminUsers)

    return (
        <DetailBody error={error} 
            loading={isLoading}
            reset={resetUser} 
            fetch={fetchUser}
            deleteFunction={userService.deleteUser}
            editForm = {<UserEdit user={user}/>}>
        
        <div className='admin__detail-content'>
                <div className='admin__detail-name'>ID</div>
                <div className='admin__detail-value'>{user.id}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Нікнейм</div>
                <div className='admin__detail-value'>{user.name}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Пошта</div>
                <div className='admin__detail-value'>{user.email}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Пароль</div>
                <div className='admin__detail-value'>{user.password}</div>
            </div>

            <div className='admin__detail-content'>
                <div className='admin__detail-name'>Адмін</div>
                <div className='admin__detail-value'>{user.isAdmin? "Так" : "Ні"}</div>
            </div>

             <div className='admin__detail-content'>
                <div className='admin__detail-name'>Додано</div>
                <div className='admin__detail-value'>{validatorService.setLocaleTime(user.date)}</div>
            </div>
        </DetailBody>
    )
}