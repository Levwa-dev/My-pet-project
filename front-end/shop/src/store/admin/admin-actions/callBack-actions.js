import { createAsyncThunk } from "@reduxjs/toolkit";
import { callBackService } from "../../../services/admin-services/callBack-service";

const error = "Помилка завантаження даних"

export const fetchCallBacks = createAsyncThunk(
    "callBack/fetchCallBacks",
    async({page, params}, {rejectWithValue}) => {
        try {
            const response = await callBackService.getCallbackList(page, params)
            if(response.error){
                return rejectWithValue(response.error)
            }
            return response
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)
export const fetchCallBack = createAsyncThunk(
    "callBack/fetchCallBack",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await callBackService.getCallback(id)
            if(response.error){
                return rejectWithValue(response.error)
            }
            return response.result
        } catch (e) {
            return rejectWithValue(error)
        }
    }
)