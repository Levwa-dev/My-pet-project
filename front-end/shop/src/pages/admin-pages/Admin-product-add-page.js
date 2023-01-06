import React from "react";

import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"
import ProductAdd from "../../components/admin-panel-components/products-components/product-add/Product-add";

export default function AdminProductAddPage () {
    return (
        <AdminLayout>
            <ProductAdd/>
        </AdminLayout>
    )
}