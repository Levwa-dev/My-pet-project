import {configureStore } from "@reduxjs/toolkit";

import userReducer from '../store/common/common-reducers/auth-reducer';
import categoryReducer from "./admin/admin-reducers/category-reducer";
import productReducer from "./admin/admin-reducers/product-reducer";

export const store = configureStore({
    reducer:{
        user : userReducer,
        adminCategory : categoryReducer,
        adminProduct : productReducer,
    }
})
