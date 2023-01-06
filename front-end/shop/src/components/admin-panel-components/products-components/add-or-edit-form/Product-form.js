import React, {useState, useEffect} from "react";
import FormsLayout from "../../ui-components/forms-layout/Forms-layout";

import { adminFetchProductsCategories } from "../../../../store/admin/admin-actions/product-actions";
import { useDispatch } from "react-redux";

export default function ProductForm ({children, defaultData, categories, sendData, currentData = ''}) {
    const [data, setData] = useState(defaultData || currentData)
    const dispatch = useDispatch()

    const saveData = (key) => (e) => {
        let value = e.target.value
        const copy = {...data}
        if(key==='picture') value = e.target.files[0]

        if(key === 'sale' || key === 'avaliable') {
            copy[key] = Boolean(Number(value))
            if(key === 'sale' && Number(value)) {
                copy.oldPrice = copy.price
            }
            if(key === 'sale' && !Number(value)){
                copy.price = copy.oldPrice
                delete copy.oldPrice
            }
            setData(copy)
            return
        }

        value ?
            copy[key] = value
            :
            delete copy[key]
        setData(copy)
    }

    useEffect(()=>{
        dispatch(adminFetchProductsCategories())
    },[])

    return (
        <FormsLayout sendData={sendData} data={data}>
            <label className="admin__label" htmlFor="name">Назва</label>
            <input defaultValue={currentData.name} onChange={saveData('name')} id="name" className="admin__input"/>
            
            <label className="admin__label" htmlFor="description">Опис</label>
            <textarea defaultValue={currentData.description} onChange={saveData('description')} id="description" type='text' className="admin__textarea"/>
            
            <label className="admin__label" htmlFor="sale">Знижка</label>
            <select defaultValue={+currentData.sale || 0} onChange={saveData('sale')} className="admin__select" id='sale'>
                <option value={0}>Ні</option>
                <option value={1}>Так</option>
            </select>

            { data.sale &&
                <>
                     <label className="admin__label" htmlFor="oldPrice">Стара ціна</label>
                     <input value={data.oldPrice || ''} onChange={saveData('oldPrice')} id="oldPrice" type='number' className="admin__input"/>
                </>
            }

            <label className="admin__label" htmlFor="price">Ціна</label>
            <input value={data.price || ''} onChange={saveData('price')} id="price" type='number' className="admin__input"/>
            
            <label className="admin__label" htmlFor="photo">Фото</label>
            <input onChange={saveData('picture')} id="photo" type='file' accept="image/*" className="admin__input"/>
           
            <label className="admin__label" htmlFor="avaliable">В продажі</label>
            <select defaultValue={+currentData.avaliable || 1} onChange={saveData('avaliable')} className="admin__select" id="avaliable">
                <option value={1}>Так</option>
                <option value={0}>Ні</option>
            
            </select>
            <label className="admin__label" htmlFor="category">Категорія</label>
            <select onChange={saveData('categoryId')} className="admin__select" id="category">
                { currentData ?
                    <option value={currentData.category.id}>{currentData.category.name}</option>
                    :
                    <option value=''>---</option>
                }
                {   categories.length &&
                        categories.map(item => {
                            if(item.id === currentData?.category?.id){
                                return null
                            }
                            else{
                                return(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        })
                }
            </select>
            {children}
        </FormsLayout>        
    )

}