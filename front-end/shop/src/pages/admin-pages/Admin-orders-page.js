import React from "react";
import AdminLayout from '../../components/admin-panel-components/ui-components/layout/AdminLayout'
import OrderList from "../../components/admin-panel-components/order-components/order-list/Order-list";


export default function AdminOrdersPage () {
    return (
        <AdminLayout>
            <OrderList/>
        </AdminLayout>
    )
}