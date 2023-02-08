import React from "react";
import styles from './user-list.module.css'

import BodyLayout from "../../ui-components/body-layout/BodyLayout";

import { validatorService } from "../../../../services/validator-services";
import { ADMIN_USERS, ADMIN_USER, ADMIN_ADD_USER } from "../../../../utils/consts";
import { fetchUserList } from "../../../../store/admin/admin-actions/users-actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserList () {
    const searchFields = [
        {searchField: 'id', title:"Знайти за ID"},
        {searchField: 'name', title:"Знайти за нікнеймом"},
        {searchField: 'email', title:"Знайти за поштою"},
    ]
    const state = useSelector(state=>state.adminUsers)

    return (
        <BodyLayout url={ADMIN_USERS}
                    searchFields={searchFields}
                    fetchAction={fetchUserList}
                    state={state}
                    buttonTitle='Додати адміністратора'
                    addURL={ADMIN_ADD_USER}>
            
            <div className={styles.title}>
                <div style={{width:'60px'}}>ID</div>
                <div>Нікнейм</div>
                <div>Пошта</div>
                <div style={{width:'60px'}}>Адмін</div>
                <div>Додано</div>
            </div>
            { state.users &&
                <ul >
                    {
                        state.users.map(item=>{
                            return(
                                <li className={styles.itemContent} key={item.id}>
                                    <Link to={ADMIN_USER + '/' + item.id}>
                                        <div className={styles.dataItem} style={{width:'60px'}}>{item.id}</div>
                                        <div className={styles.dataItem}>{item.name}</div>
                                        <div className={styles.dataItem}>{item.email}</div>
                                        <div className={styles.dataItem} style={{width:'60px'}}>{item.isAdmin? "Так": "Ні"}</div>
                                        <div className={styles.dataItem}>{validatorService.setLocaleTime(item.date)}</div>
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