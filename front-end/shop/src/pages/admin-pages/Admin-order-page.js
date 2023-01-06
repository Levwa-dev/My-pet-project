import React from "react";

import AdminLayout from '../../components/admin-panel-components/ui-components/layout/AdminLayout'
import Order from "../../components/admin-panel-components/order-components/order/Order";

export default function AdminOrderPage () {
    return (
        <AdminLayout>
            <Order/>
        </AdminLayout>
    )
}