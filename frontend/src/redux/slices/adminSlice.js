import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/login",
        adminData,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDashboard = createAsyncThunk("admin/dashboard", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/admin/dashboard",
      {
        withCredentials: true,
      },
    );
     console.log("res:", response);
    return response.data
   
  } catch (error) {
    console.log(" err:", error.message);
    return thunkAPI.rejectWithValue(error.message)
  }
});

export const addTeacher = createAsyncThunk(
  "admin/addTeacher",
  async (teacherData, thunkAPI) => {
    console.log("teacher:",teacherData);
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/addTeacher", teacherData,
        {
          withCredentials: true,
        }
       
      );
      console.log("  res:", response.data);
      return response.data
    } catch (error) {
      console.log(" Add teacher err 1:", error.message);
      console.log(" Add teacher err 2:", error.response.message);
      console.log(" Add teacher err 3:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminInfo: null,
    adminWelcome : null,
    teacherInfo : null,
    loading: false,
    error: null,
  },
  reducers: {
    clearteacherInfo : (state)=>{
      state.teacherInfo = null;
    },
    clearError : (state)=>{
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDashboard.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getDashboard.fulfilled, (state,action)=>{
        state.loading = false,
        state.adminWelcome = action.payload
      })
      .addCase(getDashboard.rejected, (state,action)=>{
        state.loading = false,
        state.error = action.payload
      })
 
      .addCase(addTeacher.pending, (state)=>{
        state.loading = true,
        state.error = null
      })
      .addCase(addTeacher.fulfilled, (state, action)=>{
        state.loading = false,
        state.teacherInfo = action.payload,
        state.error = null
      })
      .addCase(addTeacher.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      

  },
});

export const {clearteacherInfo, clearError} = adminSlice.actions;

export default adminSlice.reducer;
