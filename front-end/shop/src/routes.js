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

import AdminUserListPage from './pages/admin-pages/Admin-user-list-page'
import AdminUserPage from './pages/admin-pages/Admin-user-page'
import AdminUserAddPage from './pages/admin-pages/Admin-user-add-page'

import AdminCallBackListPage from './pages/admin-pages/Admin-callBack-list'
import AdminCallBackPage from './pages/admin-pages/Admin-callBack'

import LoginPage from './pages/common-pages/Login-page'
import NotFoundPage from './pages/common-pages/404-page'
import MainPage from './pages/common-pages/Main-page'
import ProductPage from './pages/common-pages/Product-page'
import ProductListPage from './pages/common-pages/Product-list-page'
import Cart from "./pages/common-pages/Cart-page"
import CartDeliverPage from './pages/common-pages/Cart-deliver-page'
import CallBackPage from './pages/common-pages/CallBack-page'


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
    },
    {
        path: Routes.ADMIN_USERS + '/:page',
        component: <AdminUserListPage/> 
    },
    {
        path: Routes.ADMIN_USER + '/:id',
        component: <AdminUserPage/>
    },
    {
        path: Routes.ADMIN_ADD_USER,
        component: <AdminUserAddPage/>
    },
    {
        path: Routes.ADMIN_CALLBACKS + '/:page',
        component: <AdminCallBackListPage/>
    },
    {
        path: Routes.ADMIN_CALLBACK + '/:id',
        component: <AdminCallBackPage/>
    }

]

export const commonRoutes = [
    {
        path: Routes.LOGIN_PAGE,
        component: <LoginPage/>
    },
    {
        path: Routes.MAIN,
        component: <MainPage/>
    },
    {
        path: Routes.PRODUCT + '/:id',
        component: <ProductPage/>
    },
    {
        path: Routes.PRODUCT_LIST + '/:category',
        component: <ProductListPage/>
    },
    {
        path:Routes.CART,
        component: <Cart/>
    },
    {
        path:Routes.CART_DELIVER,
        component: <CartDeliverPage/>
    },
    {
        path:Routes.CALLBACK,
        component: <CallBackPage/>
    }
   
]

export const notFoundPage =  {
    path: '*',
    component: <NotFoundPage/>
}