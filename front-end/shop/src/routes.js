import * as Routes from '../src/utils/consts'

import AdminCategoriesPage from './pages/admin-pages/Admin-categories-page'
import AdminCategoryPage from './pages/admin-pages/Admin-category-page'
import AdminProductsPage from './pages/admin-pages/Admin-products-page'
import AdminProductPage from './pages/admin-pages/Admin-product-page'

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
        path: Routes.ADMIN_PRODUCTS + '/:page',
        component: <AdminProductsPage/>
    },
    {
        path: Routes.ADMIN_PRODUCT + '/:id',
        component: <AdminProductPage/>
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