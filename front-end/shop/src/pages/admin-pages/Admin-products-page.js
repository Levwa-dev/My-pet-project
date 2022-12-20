import React from "react";
import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout";
import ProductList from "../../components/admin-panel-components/products-components/product-list/Product-list";

export default function AdminProductsPage () {

    return (
        <AdminLayout>
            <ProductList/>
        </AdminLayout>
    )
}