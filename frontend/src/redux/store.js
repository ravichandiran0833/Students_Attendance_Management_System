import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "../redux/slices/adminSlice"
import teacherReducer from "../redux/slices/teacherSlice"
export const store = configureStore({
    reducer :{
        admin : adminReducer,
        teacher : teacherReducer
    }
})