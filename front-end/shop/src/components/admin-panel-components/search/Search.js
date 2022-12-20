import React, {useState} from "react";
import style from "./search.module.css"


export default function Search ({searchFields, selectSearchFields, setSearchParams, setPage}) {
    const [params, setParams] = useState({})

    const saveData = (key) => (e) => {
        const copy = {...params}
        !e.target.value ? 
            delete copy[key]
                :
            copy[key] = e.target.value
        setParams(copy)
    }

    const sendData = () => {
        setSearchParams(new URLSearchParams(params))
        setPage(1)
    }

    const reset = () => {
        let inputs = document.getElementsByTagName('input')
        const select = document.getElementsByTagName('select')
        inputs = [...inputs, ...select]
        for(let input of inputs) {
            input.value = ''
        }
        setParams({})
        setSearchParams({})
        setPage(1)
    }

    return (
        <div className={style.searchBody}>
            <form className={style.searchForm}>
                {
                    searchFields.map((item, index)=>{
                        return (
                            <div className={style.inputs} key={index}>
                                <label htmlFor={'input'+ index}>{item.title}</label>
                                <input onChange={saveData(`${item.searchField}`)} id={'input'+ index}/>
                            </div>
                        )
                    })
                }
                { selectSearchFields && 
                    selectSearchFields.map((item, index)=>{
                        return (
                            <div className={style.inputs} key={index}>
                                <label htmlFor={'select' + index}>{item.title}</label>
                                <select id={'select' + index} onChange={saveData(`${item.searchField}`)}>
                                    <option value = ''>---</option>
                                    { item.values.map((option)=>{
                                        return(
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        )
                                      })
                                    }
                                </select>
                            </div>
                        )
                    })
                }
            </form>
            <div className={style.searchButtons}>
                <button onClick = {sendData} className={style.searchButton}>Знайти</button>
                <button onClick={reset}  className={style.resetButton}>Очистити фільтри</button>
            </div>
        </div>
    )
}