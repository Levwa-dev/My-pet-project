import React from "react";
import BodyLayout from "../../ui-components/body-layout/BodyLayout";
import styles from "./callBack-list.module.css"

import { validatorService } from "../../../../services/validator-services"
import { ADMIN_CALLBACK, ADMIN_CALLBACKS } from "../../../../utils/consts";
import { fetchCallBacks } from "../../../../store/admin/admin-actions/callBack-actions";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export default function CallBackList () {

    const searchFields = [
        {searchField: 'id', title:"Знайти за ID"},
        {searchField: 'firstName', title:"Знайти за ім'ям"},
        {searchField: 'lastName', title:"Знайти за прізвищем"},
        {searchField: 'number', title:"Знайти за номером"},

    ]
    const state = useSelector(state=>state.adminCallBack)

    return (
        <BodyLayout url={ADMIN_CALLBACKS}
                    searchFields={searchFields}
                    fetchAction={fetchCallBacks}
                    state={state}
                    buttonTitle=''>
            <div className={styles.title}>
                <div style={{width:'55px'}} >ID</div>
                <div>Ім'я</div>
                <div>Прізвище</div>
                <div>Телефон</div>
                <div style={{width:'200px'}}>Додано</div>
            </div>
            { state.records &&
                <ul>
                    {
                        state.records.map(item=>{
                            return(
                                <li key={item.id} className={styles.liItem}>
                                    <Link className={styles.link} to={ADMIN_CALLBACK + '/' + item.id}>
                                        <div className={styles.data}>
                                            <div style={{width:'55px'}} className={styles.dataItem}>{item.id}</div>
                                            <div className={styles.dataItem}>{item.firstName}</div>
                                            <div className={styles.dataItem}>{item.lastName}</div>
                                            <div className={styles.dataItem}>{item.number}</div>
                                            <div style={{width:'200px'}} className={styles.dataItem}>{validatorService.setLocaleTime(item.date)}</div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </BodyLayout>
    )

}