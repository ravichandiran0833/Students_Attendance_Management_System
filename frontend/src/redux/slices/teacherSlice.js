import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL

export const teacherLogin = createAsyncThunk("teacher/teacherLogin", async(teacherData, thunkAPI)=>{
    try {
        const response = await axios.post(`${backendUrl}/api/auth/teacher/login`,teacherData,{
            withCredentials : true
        })
        // console.log("res:",response);
        return response.data
        
    } catch (error) {
        console.log("error:",error.response);
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
        
    }
})

export const allDepartments = createAsyncThunk("teacher/allDepartments", async(_,thunkAPI)=>{
    try {
        const response = await axios.get(`${backendUrl}/api/auth/teacher/allDepartments`,{
            withCredentials : true
        })
        return response.data
    } catch (error) {
        console.log("error:",error.response);
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
        
    }
})

const teacherSlice = createSlice({
    name : "teacherSlice",
    teacherInfo : null,
    isAuthenticated : false,
    allDepartmentsInfo : null,
    initialState : {
        loading : {
            teacherInfo : false,
            allDepartments : false
        },
        error : {
             teacherInfo : null,
             allDepartments : null
        }
    },
    reducers : {
        clearTeacherInfoError :(state)=>{
            state.error.teacherInfo = null
        },
        clearTeacherInfo : (state)=>{
            state.teacherInfo = null
        },
        clearAllDepartmentsError : (state)=>{
            state.error.allDepartments = null
        }

    },

    extraReducers :(builder)=>{
        builder

        .addCase(teacherLogin.pending, (state)=>{
            state.loading.teacherInfo = true
        })
        .addCase(teacherLogin.fulfilled, (state, action)=>{
            state.loading.teacherInfo = false,
            state.teacherInfo = action.payload,
            state.isAuthenticated = true
        })
        .addCase(teacherLogin.rejected, (state,action)=>{
            state.loading.teacherInfo = false,
            state.error.teacherInfo = action.payload
        })
        .addCase(allDepartments.pending, (state)=>{
            state.loading.allDepartments = true
        })
        .addCase(allDepartments.fulfilled, (state, action)=>{
            state.loading.allDepartments = false,
            state.allDepartmentsInfo = action.payload
        })
        .addCase(allDepartments.rejected, (state, action)=>{
            state.loading.allDepartments = false,
            state.error.allDepartments = action.payload
        })

    }
})

export const {
    clearTeacherInfoError,
    clearTeacherInfo,
    clearAllDepartmentsError
} = teacherSlice.actions

export default teacherSlice.reducer