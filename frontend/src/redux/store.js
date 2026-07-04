import { configureStore } from "@reduxjs/toolkit"
import adminReducer from "../redux/slices/adminSlice"
import teacherReducer from "../redux/slices/teacherSlice"
import studentReducer from "../redux/slices/studentSlice"
export const store = configureStore({
    reducer :{
        admin : adminReducer,
        teacher : teacherReducer,
        student : studentReducer
    }
})