import * as Routes from '../src/utils/consts'

import AdminCategoryPage from './pages/admin-pages/Admin-category-page'

import LoginPage from './pages/common-pages/Login-page'
import NotFoundPage from './pages/common-pages/404-page'
import AdminProductPage from './pages/admin-pages/Admin-products-page'

export const adminRoutes = [

    {
        path: Routes.ADMIN_CATEGORY,
        component: <AdminCategoryPage/>
    },
    {
        path: Routes.ADMIN_PRODUCTS,
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