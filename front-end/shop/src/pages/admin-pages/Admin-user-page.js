import React from "react";

import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"
import UserComponent from "../../components/admin-panel-components/admins-component/user-component/User";

export default function AdminUserPage () {
    return(
        <AdminLayout>
            <UserComponent/>
        </AdminLayout>
    )
}