import React from "react";

import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"
import OrderAdd from "../../components/admin-panel-components/order-components/order-add/Order-add";

export default function AdminOrderAddPage () {
    return (
        <AdminLayout>
            <OrderAdd/>
        </AdminLayout>
    )
}