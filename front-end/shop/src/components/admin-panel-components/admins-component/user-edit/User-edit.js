import React from "react";
import { useParams } from "react-router-dom";
import { validatorService } from "../../../../services/validator-services";
import { userService } from "../../../../services/admin-services/user-service";

import UserForm from "../add-or-edit-form/User-form";

export default function UserEdit ({user}) {
    const {id} = useParams()

    const template = {
        email: user.email,
        password: user.password,
        name: user.name
    }

    const sendData = ({email, password, secondPassword, name}) => async(e) => {
        e.preventDefault()
        try {
            const editData = validatorService.checkIfDataChanged(template, {email, password, name})
            if(!editData){
                throw new Error("Дані не змінилися")
            }
            if(editData.email === '' || editData.name === '' || editData.password === ''){
                throw new Error("Заповніть всі поля")
            }
            if(editData.email && !validatorService.validateEmail(editData.email)){
                throw new Error("Невірний формат пошти")
            }
            if(editData.password && !validatorService.validatePassword(editData.password)){
                throw new Error("Невірний формат паролю")
            }
            if(editData.password !== secondPassword){
                throw new Error("Паролі не співпадають")
            }
            const response = await userService.editUser(editData, id)
            if(response.status === 200){
                alert("Запис збережено")
                window.location.reload(false)
            }
            if(response.data.error) throw new Error(response.data.error)
        } catch (e) {
            alert(e.message)
        } 
    }


    return (
        <UserForm sendData={sendData} currentData={user} />
    )
}