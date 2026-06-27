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

export const departmentStudents = createAsyncThunk("teacher/departmentStudents", async(data, thunkAPI)=>{
    console.log("data:",data);
    
    try {
        const response = await axios.post(`${backendUrl}/api/auth/teacher/departmentStudents`,data,{
            withCredentials : true
        })
        
        return response.data
    } catch (error) {
        console.log("error:",error.response);
        return thunkAPI.rejectWithValue(error.response?.data || error)
        
    }
}) 

export const submitAttendance = createAsyncThunk("teacher/submitAttendance", async(attendanceData, thunkAPI)=>{
    try {
        const response = await axios.post(`${backendUrl}/api/auth/teacher/submitAttendance`, attendanceData, {
            withCredentials : true
        })
        return response.data
    } catch (error) {
        console.log("error:",error.response);
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
        
    }
})

export const viewStudents = createAsyncThunk("teacher/viewStudents", async(data, thunkAPI)=>{
    try {
        const response  = await axios.post(`${backendUrl}/api/auth/teacher/viewStudents`, data,{
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
    departmentStudentsInfo : null,
    submitAttendanceInfo : null,
    viewStudentsInfo : null,
    initialState : {
        loading : {
            teacherInfo : false,
            allDepartments : false,
            departmentStudents : false,
            submitAttendance : false,
            viewStudents : false
        },
        error : {
             teacherInfo : null,
             allDepartments : null,
             departmentStudents : null,
             submitAttendance : null,
             viewStudents : null
        }
    },
    reducers : {
        clearTeacherInfoError :(state)=>{
            state.error.teacherInfo = null
        },
        clearTeacherInfo : (state)=>{
            state.teacherInfo = null
        },
        clearAllDepartmentsInfo : (state)=>{
            state.allDepartmentsInfo = null
        },
        clearAllDepartmentsError : (state)=>{
            state.error.allDepartments = null
        },
        clearDepartmenStudentsInfo :(state)=>{
            state.departmentStudentsInfo = null
        },
        clearDepartmentStudentsError : (state)=>{
            state.error.departmentStudents = null
        },
        clearSubmitAttendanceError : (state)=>{
            state.error.submitAttendance = null
        },
        clearSubmitAttendanceInfo : (state)=>{
            state.submitAttendanceInfo = null
        },
        clearViewStudentsInfo : (state)=>{
            state.viewStudentsInfo = null
        },
        clearViewStudentsError : (state)=>{
            state.error.viewStudents = null
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
        .addCase(departmentStudents.pending, (state)=>{
            state.loading.departmentStudents = true
        })
        .addCase(departmentStudents.fulfilled, (state, action)=>{
            state.loading.departmentStudents = false,
            state.departmentStudentsInfo = action.payload
        })
        .addCase(departmentStudents.rejected, (state, action)=>{
            state.loading.departmentStudents = false,
            state.error.departmentStudents = action.payload
        })
        .addCase(submitAttendance.pending, (state)=>{
            state.loading.submitAttendance = true
        })
        .addCase(submitAttendance.fulfilled, (state, action)=>{
            state.loading.submitAttendance = false,
            state.submitAttendanceInfo = action.payload
        })
        .addCase(submitAttendance.rejected, (state, action)=>{
            state.loading.submitAttendance = false,
            state.error.submitAttendance = action.payload
        })
        .addCase(viewStudents.pending, (state)=>{
            state.loading.viewStudents = true
        })
        .addCase(viewStudents.fulfilled, (state, action)=>{
            state.loading.viewStudents = false,
            state.viewStudentsInfo = action.payload
        })
        .addCase(viewStudents.rejected, (state, action)=>{
            state.loading.viewStudents = false,
            state.error.viewStudents = action.payload
        })

    }
})

export const {
    clearTeacherInfoError,
    clearTeacherInfo,
    clearAllDepartmentsError,
    clearDepartmenStudentsInfo,
    clearDepartmentStudentsError,
    clearSubmitAttendanceError,
    clearAllDepartmentsInfo,
    clearSubmitAttendanceInfo,
    clearViewStudentsInfo,
    clearViewStudentsError
} = teacherSlice.actions

export default teacherSlice.reducer