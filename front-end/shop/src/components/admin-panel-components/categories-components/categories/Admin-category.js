import React from "react";
import BodyLayout from "../../ui-components/body-layout/BodyLayout"

import { ADMIN_CATEGORY, ADMIN_CATEGORY_PAGE, ADMIN_ADD_CATEGORY } from "../../../../utils/consts";
import { adminFetchCategories } from "../../../../store/admin/admin-actions/category-actions";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import style from "./categories.module.css"


export default function AdminCategories () {
    
    const searchFields = [{searchField: 'id', title:"Знайти за ID"}, {searchField: 'name', title:'Знайти за назвою'}]
    const state = useSelector(state=>state.adminCategory)

    return (
        <BodyLayout url={ADMIN_CATEGORY}
                    searchFields={searchFields}
                    fetchAction={adminFetchCategories}
                    state={state}
                    buttonTitle='Додати категорію'
                    addURL={ADMIN_ADD_CATEGORY}>
            <div className={style.title}>
                <div>ID</div>
                <div>Назва</div>
            </div>
            { state.categories &&
                <ul className={style.list}>
                    {
                        state.categories.map(item=>{
                            return (
                                <li key={item.id} className={style.item}>
                                    <Link to={ADMIN_CATEGORY_PAGE + '/' + item.id}>
                                        <div className={style.data}>
                                            <div className={style.dataItem}>{item.id}</div>
                                            <div className={style.dataItem}>{item.name}</div>
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