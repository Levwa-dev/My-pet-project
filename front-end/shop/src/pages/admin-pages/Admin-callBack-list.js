import React from "react";
import CallBackList from "../../components/admin-panel-components/callBack-components/callBack-list/CallBack-list";
import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"

export default function AdminCallBackListPage (){
    return(
        <AdminLayout>
            <CallBackList/>
        </AdminLayout>
    )
}