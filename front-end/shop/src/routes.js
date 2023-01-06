import * as Routes from '../src/utils/consts'

import AdminCategoriesPage from './pages/admin-pages/Admin-categories-page'
import AdminCategoryPage from './pages/admin-pages/Admin-category-page'
import AdminCategoryAddPage from './pages/admin-pages/Admin-category-add-page'

import AdminProductsPage from './pages/admin-pages/Admin-products-page'
import AdminProductPage from './pages/admin-pages/Admin-product-page'
import AdminProductAddPage from './pages/admin-pages/Admin-product-add-page'

import AdminOrdersPage from './pages/admin-pages/Admin-orders-page'
import AdminOrderPage from './pages/admin-pages/Admin-order-page'
import AdminOrderAddPage from './pages/admin-pages/Admin-order-add-page'

import LoginPage from './pages/common-pages/Login-page'
import NotFoundPage from './pages/common-pages/404-page'




export const adminRoutes = [

    {
        path: Routes.ADMIN_CATEGORY + '/:page',
        component: <AdminCategoriesPage/>
    },
    {
        path: Routes.ADMIN_CATEGORY_PAGE + '/:id',
        component: <AdminCategoryPage/>
    },
    {
        path: Routes.ADMIN_ADD_CATEGORY,
        component: <AdminCategoryAddPage/>
    },
    {
        path: Routes.ADMIN_PRODUCTS + '/:page',
        component: <AdminProductsPage/>
    },
    {
        path: Routes.ADMIN_PRODUCT + '/:id',
        component: <AdminProductPage/>
    },
    {
        path: Routes.ADMIN_ADD_PRODUCT,
        component: <AdminProductAddPage/>
    },
    {
        path: Routes.ADMIN_ORDERS + '/:page',
        component: <AdminOrdersPage/>
    },
    {
        path: Routes.ADMIN_ORDER + '/:id',
        component: <AdminOrderPage/>
    },
    {
        path: Routes.ADMIN_ORDER_ADD,
        component: <AdminOrderAddPage/>
    }

]

export const commonRoutes = [
    {
        path: Routes.LOGIN_PAGE,
        component: <LoginPage/>
    }
   
]

export const notFoundPage =  {
    path: '*',
    component: <NotFoundPage/>
}