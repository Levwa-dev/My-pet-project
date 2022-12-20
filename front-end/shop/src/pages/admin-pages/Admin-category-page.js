import React from "react";
import AdminLayout from "../../components/admin-panel-components/ui-components/layout/AdminLayout"
import AdminCategory from "../../components/admin-panel-components/categories-components/category/Category"

export default function AdminCategoryPage() {
    return (
        <AdminLayout>
            <AdminCategory/>
        </AdminLayout>
    )
}