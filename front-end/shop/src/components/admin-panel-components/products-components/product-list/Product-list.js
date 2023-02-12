import React, {useState, useMemo, useEffect} from "react";
import BodyLayout from "../../ui-components/body-layout/BodyLayout";

import { ADMIN_PRODUCTS, ADMIN_PRODUCT, ADMIN_ADD_PRODUCT } from "../../../../utils/consts";
import { validatorService } from "../../../../services/validator-services";
import { useDispatch, useSelector } from "react-redux"
import { adminFetchProducts, adminFetchProductsCategories } from "../../../../store/admin/admin-actions/product-actions"
import { Link } from "react-router-dom"
import styles from "./product-list.module.css"

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
                    addURL={ADMIN_ADD_PRODUCT}
                    searchFields={searchFields}
                    selectSearchFields={selectSearchFields}
                    fetchAction={adminFetchProducts}
                    state={state}
                    buttonTitle='Додати товар'>
            {
                state.productList &&
                <>
                    <div className={styles.title}>
                        <div id={styles.titleId}>ID</div>
                        <div>Назва</div>
                        <div>Ціна</div>
                        <div id={styles.titleSale}>Знижка</div>
                        <div id={styles.titleAvaliable}>В продажі</div>
                        <div>Категорія</div>
                        <div>Додано</div>
                    </div>
                    <ul className={styles.list}>
                        {
                            state.productList.map((item)=>{
                                return (
                                    <li className={styles.item} key={item.id}>
                                        <Link to={ADMIN_PRODUCT + '/' + item.id}>
                                            <div className={styles.data}>
                                                <div className={styles.titleItems} id={styles.titleId}>{item.id}</div>
                                                <div className={styles.titleItems}>{item.name}</div>
                                                <div className={styles.titleItems}>{item.price}</div>
                                                <div className={styles.titleItems}>{item.sale?'так':'ні'}</div>
                                                <div className={styles.titleItems}>{item.avaliable?'так':'ні'}</div>
                                                <div className={styles.titleItems}>{item.category}</div>
                                                <div className={styles.titleItems} id={styles.date}>{validatorService.setLocaleTime(item.date)}</div>
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