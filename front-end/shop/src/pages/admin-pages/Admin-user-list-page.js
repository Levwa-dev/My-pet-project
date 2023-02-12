import React from "react";

import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"
import AdminList from "../../components/admin-panel-components/admins-component/user-list-component/User-list";

export default function AdminUserListPage () {
    return (
        <AdminLayout>
            <AdminList/>
        </AdminLayout>
    )
}