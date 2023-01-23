import React, { useEffect, useState } from "react"
import ProductListItem from "../product-list`s-item/ProductListItem"
import styles from "./product-list.module.css"

import { useDispatch, useSelector } from 'react-redux'
import { resetProductList, setCurrentCategory } from "../../../store/common/common-reducers/products-reducer"
import { getProductList } from '../../../store/common/common-actions/products-action'
import { useParams } from "react-router-dom"

import ErrorOccurred from '../error-component/Error-occurred'
import LoadingComponent from '../loading/Loading'

export default function ProductList () {
    const [page, setPage] = useState(1)
    const {productList, pages, error, loading, currentCategory} = useSelector(state=>state.commonProducts)
    const dispatch = useDispatch()
    const {category} = useParams()

    useEffect(()=>{
        dispatch(getProductList({page, category, productList}))
        return () => dispatch(resetProductList())
    },[])

    useEffect(()=>{
        if(currentCategory !== productList[0]?.category){
            dispatch(setCurrentCategory({name:productList[0]?.category}))
        }
    },[productList])

    useEffect(()=>{
        dispatch(getProductList({page, category, productList}))
    },[page])

    const loadMoreProducts = (e) => {
        if(page < pages) {
            const newPage = page + 1
            setPage(newPage)
            return
        }
        alert('Це всі наявні товари цієї категорії')
    }

    return (
        <main className={styles.main}>
            <div className="wrapper">
                { error ?
                    <ErrorOccurred error={error} />
                    :
                    loading ?
                        <LoadingComponent/>
                        :
                        <>
                            <h1 className={styles.title}>{currentCategory.name}</h1>
                            <ProductListItem products={productList}/>
                            <button onClick={loadMoreProducts} className={styles.moreButton} >Завантажити ще</button>
                        </>
                }
            </div>        
        </main>
    )
}