import React from "react"
import AdminHeader from "./header/Admin-header"
import AdminNavigation from "./navigation/Admin-navigation"

export default function AdminLayout ({children}) {

    return (
        <>
            <AdminHeader/>
                <AdminNavigation/>
                <div style={{'margin':'60px 0 0 230px'}}>
                    {children}
                </div>
        </>
    )
} 