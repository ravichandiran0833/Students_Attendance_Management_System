import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const studentViewAttendance = createAsyncThunk("student/studentViewAttendance", async(id, thunkAPI)=>{
    try {
        const response = await axios.get(`${backendUrl}/api/auth/student/studentViewAttendance/${id}`)

        return response.data
    } catch (error) {
        console.log("error:",error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
        
    }
})

const studentSlice = createSlice({
    name : "studentSlice",
    initialState : {
        studentViewAttendanceInfo : null,
        loading : {
            studentViewAttendance : false
        },
        error : {
            studentViewAttendance : null
        }
    },
    reducers :{
        clearStudentViewAttendanceInfo : (state)=>{
            state.studentViewAttendanceInfo = null
        },
        clearStudentViewAttendanceError : (state)=>{
            state.error.studentViewAttendance = null
        }
    },


    extraReducers : (builder)=>{
        builder

        .addCase(studentViewAttendance.pending, (state)=>{
            state.loading.studentViewAttendance = true
        })
        .addCase(studentViewAttendance.fulfilled, (state, action)=>{
            state.loading.studentViewAttendance = false,
            state.studentViewAttendanceInfo = action.payload
        })
        .addCase(studentViewAttendance.rejected, (state, action)=>{
            state.loading.studentViewAttendance = false,
            state.error.studentViewAttendance = action.payload
        })

    }

})

export const {
clearStudentViewAttendanceError,
clearStudentViewAttendanceInfo
} = studentSlice.actions

export default studentSlice.reducer