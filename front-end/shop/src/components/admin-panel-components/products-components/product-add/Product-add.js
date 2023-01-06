import React from "react";
import ProductForm from "../add-or-edit-form/Product-form";

import { validatorService } from "../../../../services/validator-services";
import { productService } from "../../../../services/admin-services/product-service";

import { useSelector } from "react-redux";

export default function ProductAdd () {
    const data = {sale:false, avaliable:true}
    const {categories} = useSelector(state=>state.adminProduct)

    const template = {
        name:'',
        price:'',
        description:'',
        picture:'',
        sale:'',
        avaliable:'',
        categoryId:''
    }
    const sendData = (data) => async (e) => {
        try {
            e.preventDefault()
            const isFulfield = validatorService.checkFullfield(template, data)
            if(isFulfield){ // якщо всі поля заповнені
                let formData = new FormData()
                for(let key in data) {
                    formData.append(key, data[key])
                }
                const response = await productService.postProduct(formData)
                if(response.status === 200){
                    alert('Запис додано')
                    window.location.reload(false)
                }
                if(response.data.error) alert(response.data.error)
            }
            else alert('Заповніть всі поля')
        } catch (error) {
            alert('Помилка збереження, спробуйте пізніше')
        }
       
    } 

    return (
        <ProductForm defaultData={data} categories={categories} sendData={sendData} />
    )
}