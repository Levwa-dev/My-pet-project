import React, {useState, useMemo, useEffect} from "react";
import BodyLayout from "../../ui-components/body-layout/BodyLayout";

import { ADMIN_PRODUCTS, ADMIN_PRODUCT } from "../../../../utils/consts";
import { validatorService } from "../../../../services/validator-services";
import { useDispatch, useSelector } from "react-redux"
import { adminFetchProducts, adminFetchProductsCategories } from "../../../../store/admin/admin-actions/product-actions"
import { Link } from "react-router-dom"
import style from "./product-list.module.css"

export default function ProductList () {
    const searchFields = [
        {searchField: 'id', title:"Знайти за ID"},
        {searchField: 'name', title:'Знайти за назвою'},
        {searchField: 'price', title:"Знайти за ціною"},
    ]
    const [selectSearchFields, setSelectSearchFields] = useState()

    const state = useSelector(state=>state.adminProduct)
    const dispatch = useDispatch()

    useMemo(()=>{
        if(state.categories.length > 0){
            const select = [{title:'Знайти за категорією', searchField: 'categoryId', values:[...state.categories]}]
            setSelectSearchFields(select)
        }
    },[state.categories])

    useEffect(()=>{
        dispatch(adminFetchProductsCategories())
    },[])

    return (
        <BodyLayout url={ADMIN_PRODUCTS}
                    searchFields={searchFields}
                    selectSearchFields={selectSearchFields}
                    fetchAction={adminFetchProducts}
                    state={state}
                    buttonTitle='Додати товар'>
            {
                state.productList &&
                <>
                    <div className={style.title}>
                        <div id={style.titleId}>ID</div>
                        <div>Назва</div>
                        <div>Ціна</div>
                        <div id={style.titleSale}>Знижка</div>
                        <div id={style.titleAvaliable}>В продажі</div>
                        <div>Категорія</div>
                        <div>Додано</div>
                    </div>
                    <ul>
                        {
                            state.productList.map((item)=>{
                                return (
                                    <li className={style.item} key={item.id}>
                                        <Link to={ADMIN_PRODUCT + '/' + item.id}>
                                            <div className={style.data}>
                                                <div id={style.titleId}>{item.id}</div>
                                                <div>{item.name}</div>
                                                <div>{item.price}</div>
                                                <div>{item.price?'так':'ні'}</div>
                                                <div>{item.avaliable?'так':'ні'}</div>
                                                <div>{item.category}</div>
                                                <div id={style.date}>{validatorService.setLocaleTime(item.date)}</div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            }
        </BodyLayout>
    )
}