import React from "react";
import styles from './order-list.module.css'

import BodyLayout from "../../ui-components/body-layout/BodyLayout";

import { validatorService } from "../../../../services/validator-services";
import { ADMIN_ORDERS, ADMIN_ORDER, ADMIN_ORDER_ADD } from "../../../../utils/consts"
import { fetchOrders } from "../../../../store/admin/admin-actions/order-actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrderList () {

    const searchFields = [
            {searchField: 'id', title:"Знайти за ID"},
            {searchField: 'firstName', title:"Знайти за ім'ям"},
            {searchField: 'lastName', title:"Знайти за прізвищем"},
            {searchField: 'patronymic', title:"Знайти по батькові"},
            {searchField: 'orderNumber', title:"Знайти за номером замовлення"},
            {searchField: 'telephone', title:"Знайти за номером телефону"}
        ]
    const state = useSelector(state=>state.adminOrder)

    return (
        <BodyLayout url={ADMIN_ORDERS}
                    searchFields={searchFields}
                    fetchAction={fetchOrders}
                    state={state}
                    buttonTitle='Додати замовлення'
                    addURL={ADMIN_ORDER_ADD}>
        { state.orders && 
            <>
                <div className={styles.title}>
                    <div id={styles.titleId} className={styles.titleItem}>ID</div>
                    <div className={styles.titleItem}>Ім'я</div>
                    <div className={styles.titleItem}>Прізвище</div>
                    <div className={styles.titleItem}>Замовлення №</div>
                    <div className={styles.titleItem}>Телефон</div>
                    <div className={styles.titleItem}>Ціна</div>
                    <div className={styles.titleItem}>Замовленно</div>
                </div>
                <ul className={styles.list}>
                    {  state.orders.map((item)=>{
                            return (
                                <li className={styles.item} key={item.id}>
                                    <Link  to={ADMIN_ORDER +'/'+ item.id}>
                                        <div className={styles.data}>
                                            <div id={styles.dataItemId} className={styles.dataItem}>{item.id}</div>
                                            <div className={styles.dataItem}>{item.firstName}</div>
                                            <div className={styles.dataItem}>{item.lastName}</div>
                                            <div className={styles.dataItem}>{item.orderNumber}</div>
                                            <div className={styles.dataItem}>{item.telephone}</div>
                                            <div className={styles.dataItem}>{item.totalPrice}</div>
                                            <div id={styles.dataItemDate} className={styles.dataItem}>{validatorService.setLocaleTime(item.date)}</div>
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