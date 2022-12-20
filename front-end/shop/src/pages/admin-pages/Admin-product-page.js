import React from "react";
import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout";
import Product from "../../components/admin-panel-components/products-components/product/Product";

export default function AdminProductPage () {
    return (
        <AdminLayout>
            <Product/>
        </AdminLayout>
    )
}