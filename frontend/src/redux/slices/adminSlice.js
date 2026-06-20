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
  async (departmentData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/addDepartment",
        departmentData,
        {
          withCredentials: true,
        },
      );
      console.log("add department res :", response.data);
      return response.data;
    } catch (error) {
      console.log("add department err :", error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const viewTeachers = createAsyncThunk(
  "admin/viewTeachers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/admin/viewTeachers",
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("view teachers error :", error.response);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getSingleTeacher = createAsyncThunk(
  "admin/singleTeacher",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/auth/admin/singleTeacher/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("err:", error.response);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editTeacher = createAsyncThunk(
  "admin/editTeacher",
  async ({ id, formData: teacherData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/admin/editTeacher/${id}`,
        teacherData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("err :", error);
      return thunkAPI.rejectWithValue(error.response);
    }
  },
);

export const deleteTeacher = createAsyncThunk(
  "admin/deleteTeacher",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/auth/admin/deleteTeacher/${id}`,
        {
          withCredentials : true
        }
      );
      return response.data;
    } catch (error) {
      console.log("error:",error.response);
      return thunkAPI.rejectWithValue(error.response.data)
      
    }
  },
);

export const getAllDepartments = createAsyncThunk("admin/getAllDepartments", async(_, thunkAPI)=>{
  try {
    const response = await axios.get("http://localhost:3000/api/auth/admin/getAllDepartments",
      {
        withCredentials : true
      }
    )
    return response.data 
  } catch (error) {
    console.log("error:",error);
    return thunkAPI.rejectWithValue(error.response.data || error) 
  }
})

export const singleDepartment = createAsyncThunk("admin/singleDepartment",async(id, thunkAPI)=>{
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/admin/singleDepartment/${id}`,
      {
        withCredentials : true
      }
    )
    return response.data
  } catch (error) {
    console.log("error:",error);
    return thunkAPI.rejectWithValue(error.response.data || error)   
  }
})

export const editDepartment = createAsyncThunk("admin/editDepartment",async({id, department},thunkAPI)=>{
  try {
    const response = await axios.put(`http://localhost:3000/api/auth/admin/editDepartment/${id}`,
      department,
      {
        withCredentials : true
      }
    )
    return response.data
  } catch (error) {
    console.log("error:",error.response);
    return thunkAPI.rejectWithValue(error.response.data || error)
    
  }
})

export const deleteDepartment = createAsyncThunk("admin/deleteDepartment",async(id, thunkAPI)=>{
  try {
    const response = await axios.delete(`http://localhost:3000/api/auth/admin/deleteDepartment/${id}`,{
      withCredentials : true
    })

    return response.data
  } catch (error) {
    console.log("error:",error.response);
    return thunkAPI.rejectWithValue(error.response.data || error)
  }
})

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminInfo: null,
    adminWelcome: null,
    teacherInfo: null,
    departmentInfo: null,
    AllTeachersData: null,
    loading: false,
    singleTeacher: null,
    editTeacherInfo: null,
    deleteTeacherInfo : null,
    getAllDepartmentsInfo : null,
    singleDepartmentInfo : null,
    editDepartmentInfo : null,
    deleteDepartmentInfo : null,
    error: null,
  },
  reducers: {
    clearteacherInfo: (state) => {
      state.teacherInfo = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearDepartmentInfo: (state) => {
      state.departmentInfo = null;
    },
    clearAdminWelcome: (state) => {
      state.adminWelcome = null;
    },
    clearAllTeachersData: (state) => {
      state.AllTeachersData = null;
    },
    clearEditTeacherInfo: (state) => {
      state.editTeacherInfo = null;
    },
    clearSingleTeacher: (state) => {
      state.singleTeacher = null;
    },
    clearDeleteTeacherInfo : (state)=>{
      state.deleteTeacherInfo = null
    },
    clearAllDepartmentsInfo : (state)=>{
      state.getAllDepartmentsInfo = null
    },
    clearEditDepartmentInfo : (state)=>{
      state.editDepartmentInfo = null
    },
    clearSingleDepartmentInfo : (state)=>{
      state.singleDepartmentInfo = null
    },
    clearDeleteDepartmentInfo : (state)=>{
      state.deleteDepartmentInfo = null
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
        ((state.loading = false), (state.adminWelcome = action.payload));
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
      .addCase(viewTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewTeachers.fulfilled, (state, action) => {
        ((state.loading = false), (state.AllTeachersData = action.payload));
      })
      .addCase(viewTeachers.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(getSingleTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleTeacher.fulfilled, (state, action) => {
        ((state.loading = false), (state.singleTeacher = action.payload));
      })
      .addCase(getSingleTeacher.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(editTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        console.log("editTeacher payload :", action.payload);

        ((state.loading = false), (state.editTeacherInfo = action.payload));
      })
      .addCase(editTeacher.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(deleteTeacher.pending, (state)=>{
        state.loading = true
      })
      .addCase(deleteTeacher.fulfilled, (state, action)=>{
        state.loading = false
        state.deleteTeacherInfo = action.payload
      })
      .addCase(deleteTeacher.rejected, (state, action)=>{
        state.loading = false
        state.error = action.payload
      })
      .addCase(getAllDepartments.pending, (state)=>{
        state.loading = true
      })
      .addCase(getAllDepartments.fulfilled, (state, action)=>{
        state.loading = false,
        state.getAllDepartmentsInfo = action.payload
      })
      .addCase(getAllDepartments.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(singleDepartment.pending, (state)=>{
        state.loading = true
      })
      .addCase(singleDepartment.fulfilled, (state, action)=>{
        state.loading = false
        state.singleDepartmentInfo = action.payload
      })
      .addCase(singleDepartment.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(editDepartment.pending, (state)=>{
        state.loading = true
      })
      .addCase(editDepartment.fulfilled, (state, action)=>{
        state.loading = false,
        state.editDepartmentInfo = action.payload
      })
      .addCase(editDepartment.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.payload
      })
      .addCase(deleteDepartment.pending, (state)=>{
        state.loading = true
      })
      .addCase(deleteDepartment.fulfilled, (state, action)=>{
        state.loading = false,
        state.deleteDepartmentInfo = action.payload
      })
      .addCase(deleteDepartment.rejected, (state,action)=>{
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
  clearEditTeacherInfo,
  clearSingleTeacher,
  clearDeleteTeacherInfo,
  clearAllDepartmentsInfo,
  clearEditDepartmentInfo,
  clearSingleDepartmentInfo,
  clearDeleteDepartmentInfo
} = adminSlice.actions;

export default adminSlice.reducer;
