import React from "react";
import AdminLayout from '../../components/admin-panel-components/ui-components/layout/AdminLayout'
import AddUser from "../../components/admin-panel-components/admins-component/user-add/Add-user";

export default function AdminUserAddPage () {
    return(
        <AdminLayout>
            <AddUser/>
        </AdminLayout>
    )
}