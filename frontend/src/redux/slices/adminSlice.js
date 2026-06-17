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

export const getDashboard = createAsyncThunk(
  "admin/dashboard",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/admin/dashboard",
        {
          withCredentials: true,
        },
      );
      //  console.log("res:", response);
      return response.data;
    } catch (error) {
      console.log(" err:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addTeacher = createAsyncThunk(
  "admin/addTeacher",
  async (teacherData, thunkAPI) => {
    console.log("teacher:", teacherData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/addTeacher",
        teacherData,
        {
          withCredentials: true,
        },
      );
      console.log("  res:", response.data);
      return response.data;
    } catch (error) {
      console.log(" Add teacher err 1:", error.message);
      console.log(" Add teacher err 2:", error.response.message);
      console.log(" Add teacher err 3:", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addDepartment = createAsyncThunk(
  "admin/addDepartment",
  async(departmentData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/addDepartment",
        departmentData,
        {
          withCredentials: true,
        },
      );
      console.log("add department res :", response.data);
      return response.data
    } catch (error) {
      console.log("add department err :", error.response);
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
);

export const viewTeachers = createAsyncThunk("admin/viewTeachers", async(_, thunkAPI)=>{
  try {
    const response = await axios.get("http://localhost:3000/api/auth/admin/viewTeachers",
      {
        withCredentials : true
      }
    )
    return response.data
  } catch (error) {
    console.log("view teachers error :",error.response);
    
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getSingleTeacher = createAsyncThunk("admin/singleTeacher" ,async(id, thunkAPI)=>{
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/admin/singleTeacher/${id}`,{
      withCredentials : true
    })
    return response.data 
  } catch (error) {
    console.log("err:",error.response);
    
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const editTeacher = createAsyncThunk("admin/editTeacher", async({id, formData:teacherData}, thunkAPI)=>{
  try {
    const response = await axios.put(`http://localhost:3000/api/auth/admin/editTeacher/${id}`,teacherData, {
      withCredentials : true
    })
    return response.data
  } catch (error) {
    console.log("err :",error);
    return thunkAPI.rejectWithValue(error.response.data)
    
  }
})

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminInfo: null,
    adminWelcome: null,
    teacherInfo: null,
    departmentInfo: null,
    AllTeachersData : null,
    loading: false,
    singleTeacher : null,
    editTeacherInfo : null,
    error: null,
  },
  reducers: {
    clearteacherInfo: (state) => {
      state.teacherInfo = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDepartmentInfo :(state)=>{
      state.departmentInfo = null
    },
    clearAdminWelcome : (state)=>{
      state.adminWelcome = null
    },
    clearAllTeachersData : (state)=>{
      state.AllTeachersData = null
    },
    clearEditTeacherInfo :(state)=>{
      state.editTeacherInfo = null
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
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false,
        state.adminWelcome = action.payload
       
      })
      .addCase(getDashboard.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })

      .addCase(addTeacher.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.teacherInfo = action.payload),
          (state.error = null));
      })
      .addCase(addTeacher.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(addDepartment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.departmentInfo = action.payload),
          (state.error = null));
      })
      .addCase(addDepartment.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(viewTeachers.pending, (state)=>{
        state.loading = true
      })
      .addCase(viewTeachers.fulfilled, (state, action)=>{
        state.loading = false,
        state.AllTeachersData = action.payload
      })
      .addCase(viewTeachers.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(getSingleTeacher.pending, (state)=>{
        state.loading = true
      })
      .addCase(getSingleTeacher.fulfilled, (state,action)=>{
        state.loading = false,
        state.singleTeacher = action.payload
      })
      .addCase(getSingleTeacher.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(editTeacher.pending, (state)=>{
        state.loading = true
      })
      .addCase(editTeacher.fulfilled, (state,action)=>{
        console.log("editTeacher payload :",action.payload);
        
        state.loading = false,
        state.editTeacherInfo = action.payload
      })
      .addCase(editTeacher.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      
  },
});

export const { 
  clearteacherInfo,
   clearError, 
   clearDepartmentInfo,
   clearAdminWelcome,
   clearAllTeachersData,
   clearEditTeacherInfo
} = adminSlice.actions;

export default adminSlice.reducer;
