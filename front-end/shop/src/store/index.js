import {configureStore } from "@reduxjs/toolkit";

import userReducer from '../store/common/common-reducers/auth-reducer';
import categoryReducer from "./admin/admin-reducers/category-reducer";
import productReducer from "./admin/admin-reducers/product-reducer";
import orderReducer from "./admin/admin-reducers/order-reducer";

import mainPageReducer from "./common/common-reducers/main-page-reducer";
import commonProductsReducer from "./common/common-reducers/products-reducer"
import cartReducer from "./common/common-reducers/cart-reducer";

export const store = configureStore({
    reducer:{
        user : userReducer,
        adminCategory : categoryReducer,
        adminProduct : productReducer,
        adminOrder : orderReducer,
        mainPage : mainPageReducer,
        commonProducts : commonProductsReducer,
        cart:cartReducer, 
    }
})
