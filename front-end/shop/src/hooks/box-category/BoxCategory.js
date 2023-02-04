import {useEffect} from "react";

import { useDispatch} from "react-redux";
import { getBoxCategory } from "../../store/common/common-actions/products-action";

export default function BoxCategory () {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBoxCategory())
    },[])

    return null
}