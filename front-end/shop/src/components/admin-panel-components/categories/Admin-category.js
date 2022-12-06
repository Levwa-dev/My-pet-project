import React from "react";
import Search from "../search/Search";

export default function AdminCategory () {
    const searchFields = ["Знайти за назвою", "Знайти за ID"]

    return (
        <>  
            <Search searchFields = {searchFields} />
            
        </>
    )
}