import {configureStore } from "@reduxjs/toolkit";

import userReducer from '../store/common/common-reducers/auth-reducer'

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})
