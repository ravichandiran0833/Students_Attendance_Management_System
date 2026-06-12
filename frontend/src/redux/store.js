import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "../redux/slices/adminSlice"
export const store = configureStore({
    reducer :{
        admin : adminReducer
    }
})