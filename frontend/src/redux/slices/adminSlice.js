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
  } catch (error) {
    console.log("err:", error);
    return thunkAPI.rejectWithValue(error)
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
      console.log("res:", response.data);
      return response.data
    } catch (error) {
      console.log("err:", error);
      thunkAPI.rejectWithValue(error)
    }
  },
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminInfo: null,
    teacherInfo : null,
    loading: false,
    error: null,
  },
  reducers: {
    clearteacherInfo : (state)=>{
      state.teacherInfo = null;
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

export const {clearteacherInfo} = adminSlice.actions;

export default adminSlice.reducer;
