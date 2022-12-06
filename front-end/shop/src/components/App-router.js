import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { adminRoutes, commonRoutes, notFoundPage } from "../routes";
import { useSelector } from "react-redux";
export default function AppRouter() {

    const {isAdmin} = useSelector(state=>state.user)

    return (
        <BrowserRouter>
            <Routes>
                { isAdmin && adminRoutes.map(({path, component})=>{
                    return <Route key={path} path={path} element={component}/>
                })
                }
                { commonRoutes.map(({path, component})=>{
                    return <Route key={path} path={path} element={component}/>
                })
                }
                <Route path={notFoundPage.path} element={notFoundPage.component}/>
            </Routes>
        </BrowserRouter>
    )
}