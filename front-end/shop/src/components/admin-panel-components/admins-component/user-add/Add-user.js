import React from "react";
import UserForm from "../add-or-edit-form/User-form";
import { userService } from "../../../../services/admin-services/user-service";
import { validatorService } from "../../../../services/validator-services";

export default function AddUser () {
    const sendData = ({email, password, secondPassword, name}) => async(e) => {
        e.preventDefault()
        try {
            if(email !== '' && password !== '' && name !== ''){
                if(!validatorService.validateEmail(email)){
                    throw new Error("Невірний формат пошти")
                }
                if(!validatorService.validatePassword(password)){
                    throw new Error("Невірний формат паролю")
                }
                if(password !== secondPassword){
                    throw new Error("Паролі не співпадають")
                }
                const response = await userService.addUser({email, password, name})
                if(response.status === 200){
                    alert("Запис збережено")
                    window.location.reload(false)
                }
                if(response.data.error) throw new Error(response.data.error)
                return
            }
            throw new Error("Заповніть всі поля")
        } catch (e) {
            alert(e.message)
        } 
    }

    return(
        <UserForm sendData={sendData}/>
    )
}