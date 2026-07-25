import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log("backendUrl:",backendUrl);


export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/admin/login`,
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
        `${backendUrl}/api/auth/admin/dashboard`,
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
        `${backendUrl}/api/auth/admin/addTeacher`,
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
        `${backendUrl}/api/auth/admin/addDepartment`,
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
        `${backendUrl}/api/auth/admin/viewTeachers`,
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
        `${backendUrl}/api/auth/admin/singleTeacher/${id}`,
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
        `${backendUrl}/api/auth/admin/editTeacher/${id}`,
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
        `${backendUrl}/api/auth/admin/deleteTeacher/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllDepartments = createAsyncThunk(
  "admin/getAllDepartments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/admin/getAllDepartments`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error.response.data || error);
    }
  },
);

export const singleDepartment = createAsyncThunk(
  "admin/singleDepartment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/admin/singleDepartment/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error.response.data || error);
    }
  },
);

export const editDepartment = createAsyncThunk(
  "admin/editDepartment",
  async ({ id, department }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/auth/admin/editDepartment/${id}`,
        department,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response.data || error);
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  "admin/deleteDepartment",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/auth/admin/deleteDepartment/${id}`,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response.data || error);
    }
  },
);


export const sendOtp = createAsyncThunk("admin/sendOtp", async(email, thunkAPI)=>{
  try {
    const response = await axios.post(`${backendUrl}/api/auth/admin/send-otp`, email,{
      withCredentials : true
    })
    return response.data
    // console.log("send otp response : ",response.data);
    
  } catch (error) {
    console.log("error:",error.response);
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
    
  }
})


export const verifyOtp = createAsyncThunk("admin/verifyOtp", async({email,otpData}, thunkAPI)=>{
  try {
    const response = await axios.post(`${backendUrl}/api/auth/admin/verify-otp`, {email, otpData}, {
      withCredentials : true
    })
    return response.data
  } catch (error) {
    console.log("error:",error.response);
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
    
  }
})


export const resetPassword = createAsyncThunk("admin/resetPassword", async({email,newPassword}, thunkAPI)=>{
  try {
    const response = await axios.patch(`${backendUrl}/api/auth/admin/reset-password`,{email, newPassword},{
      withCredentials : true
    })
    return response.data
  } catch (error) {
    console.log("error:",error.response);
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
    
  }
})

export const totalStudentsCount = createAsyncThunk("admin/totalStudentsCount", async(_, thunkAPI)=>{
  try {
    const response = await axios.get(`${backendUrl}/api/auth/admin/totalStudents`,{
      withCredentials : true
    })
    return response.data
  } catch (error) {
    console.log("error:",error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message)
    
  }
})


const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    loading: {
      adminLogin: false,
      getDashboard: false,
      addTeacher: false,
      addDepartment: false,
      viewTeachers: false,
      getSingleTeacher: false,
      editTeacher: false,
      deleteTeacher: false,
      getAllDepartments: false,
      singleDepartment: false,
      editDepartment: false,
      deleteDepartment: false,
      sendOtp : false,
      verifyOtp : false,
      resetPassword : false,
      totalStudentsCount : false
    },
    adminInfo: null,
    adminWelcome: null,
    teacherInfo: null,
    departmentInfo: null,
    AllTeachersData: null,
    singleTeacher: null,
    editTeacherInfo: null,
    deleteTeacherInfo: null,
    getAllDepartmentsInfo: null,
    singleDepartmentInfo: null,
    editDepartmentInfo: null,
    deleteDepartmentInfo: null,
    otpInfo : null,
    verifyOtpInfo : null,
    resetPasswordInfo : null,
    error: null,
    totalStudentsCountInfo : null,
    isAuthenticated : false
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
    clearDeleteTeacherInfo: (state) => {
      state.deleteTeacherInfo = null;
    },
    clearAllDepartmentsInfo: (state) => {
      state.getAllDepartmentsInfo = null;
    },
    clearEditDepartmentInfo: (state) => {
      state.editDepartmentInfo = null;
    },
    clearSingleDepartmentInfo: (state) => {
      state.singleDepartmentInfo = null;
    },
    clearDeleteDepartmentInfo: (state) => {
      state.deleteDepartmentInfo = null;
    },
    clearOtpInfo : (state)=>{
      state.otpInfo = null
    },
    clearVerifyOtpInfo : (state)=>{
      state.verifyOtpInfo = null
    },
    clearResetPasswordInfo : (state)=>{
      state.resetPasswordInfo = null
    },
    clearAdminInfo : (state)=>{
      state.adminInfo = null
    },


  },
  extraReducers: (builder) => {
    builder

      .addCase(adminLogin.pending, (state) => {
        state.loading.adminLogin = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading.adminLogin = false;
        state.adminInfo = action.payload;
        state.isAuthenticated = true
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading.adminLogin = false;
        state.error = action.payload;
      })
      .addCase(getDashboard.pending, (state) => {
        state.loading.getDashboard = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        ((state.loading.getDashboard = false),
          (state.adminWelcome = action.payload));
      })
      .addCase(getDashboard.rejected, (state, action) => {
        ((state.loading.getDashboard = false), (state.error = action.payload));
      })

      .addCase(addTeacher.pending, (state) => {
        ((state.loading.addTeacher = true), (state.error = null));
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        ((state.loading.addTeacher = false),
          (state.teacherInfo = action.payload),
          (state.error = null));
      })
      .addCase(addTeacher.rejected, (state, action) => {
        ((state.loading.addTeacher = false), (state.error = action.payload));
      })
      .addCase(addDepartment.pending, (state) => {
        state.loading.addDepartment = true;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        ((state.loading.addDepartment = false),
          (state.departmentInfo = action.payload),
          (state.error = null));
      })
      .addCase(addDepartment.rejected, (state, action) => {
        ((state.loading.addDepartment = false), (state.error = action.payload));
      })
      .addCase(viewTeachers.pending, (state) => {
        state.loading.viewTeachers = true;
      })
      .addCase(viewTeachers.fulfilled, (state, action) => {
        ((state.loading.viewTeachers = false),
          (state.AllTeachersData = action.payload));
      })
      .addCase(viewTeachers.rejected, (state, action) => {
        ((state.loading.viewTeachers = false), (state.error = action.payload));
      })
      .addCase(getSingleTeacher.pending, (state) => {
        state.loading.getSingleTeacher = true;
      })
      .addCase(getSingleTeacher.fulfilled, (state, action) => {
        ((state.loading.getSingleTeacher = false),
          (state.singleTeacher = action.payload));
      })
      .addCase(getSingleTeacher.rejected, (state, action) => {
        ((state.loading.getSingleTeacher = false),
          (state.error = action.payload));
      })
      .addCase(editTeacher.pending, (state) => {
        state.loading.editTeacher = true;
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        ((state.loading.editTeacher = false),
          (state.editTeacherInfo = action.payload));
      })
      .addCase(editTeacher.rejected, (state, action) => {
        ((state.loading.editTeacher = false), (state.error = action.payload));
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading.deleteTeacher = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading.deleteTeacher = false;
        state.deleteTeacherInfo = action.payload;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading.deleteTeacher = false;
        state.error = action.payload;
      })
      .addCase(getAllDepartments.pending, (state) => {
        state.loading.getAllDepartments = true;
      })
      .addCase(getAllDepartments.fulfilled, (state, action) => {
        ((state.loading.getAllDepartments = false),
          (state.getAllDepartmentsInfo = action.payload));
      })
      .addCase(getAllDepartments.rejected, (state, action) => {
        ((state.loading.getAllDepartments = false),
          (state.error = action.payload));
      })
      .addCase(singleDepartment.pending, (state) => {
        state.loading.singleDepartment = true;
      })
      .addCase(singleDepartment.fulfilled, (state, action) => {
        state.loading.singleDepartment = false;
        state.singleDepartmentInfo = action.payload;
      })
      .addCase(singleDepartment.rejected, (state, action) => {
        ((state.loading.singleDepartment = false),
          (state.error = action.payload));
      })
      .addCase(editDepartment.pending, (state) => {
        state.loading.editDepartment = true;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        ((state.loading.editDepartment = false),
          (state.editDepartmentInfo = action.payload));
      })
      .addCase(editDepartment.rejected, (state, action) => {
        ((state.loading.editDepartment = false),
          (state.error = action.payload));
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading.deleteDepartment = true;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        ((state.loading.deleteDepartment = false),
          (state.deleteDepartmentInfo = action.payload));
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        ((state.loading.deleteDepartment = false),
          (state.error = action.payload));
      })
      .addCase(sendOtp.pending, (state)=>{
        state.loading.sendOtp = true
      })
      .addCase(sendOtp.fulfilled, (state,action)=>{
        state.loading.sendOtp = false,
        state.otpInfo = action.payload
      })
      .addCase(sendOtp.rejected, (state, action)=>{
        state.loading.sendOtp = false,
        state.error = action.payload
      })
      .addCase(verifyOtp.pending, (state)=>{
        state.loading.verifyOtp = true
      })
      .addCase(verifyOtp.fulfilled, (state, action)=>{
        state.loading.verifyOtp = false,
        state.verifyOtpInfo = action.payload
      })
      .addCase(verifyOtp.rejected, (state, action)=>{
        state.loading.verifyOtp = false,
        state.error = action.payload
      })
      .addCase(resetPassword.pending, (state)=>{
        state.loading.resetPassword = true
      })
      .addCase(resetPassword.fulfilled, (state, action)=>{
        state.loading.resetPassword = false,
        state.resetPasswordInfo = action.payload
      })
      .addCase(resetPassword.rejected, (state, action)=>{
        state.loading.resetPassword = false,
        state.error = action.payload
      })
      .addCase(totalStudentsCount.pending, (state)=>{
        state.loading.totalStudentsCount = true
      })
      .addCase(totalStudentsCount.fulfilled, (state, action)=>{
        state.loading.totalStudentsCount = false,
        state.totalStudentsCountInfo = action.payload
      })
      .addCase(totalStudentsCount.rejected, (state, action)=>{
        state.loading.totalStudentsCount = false,
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
  clearDeleteDepartmentInfo,
  clearOtpInfo,
  clearVerifyOtpInfo,
  clearResetPasswordInfo,
  clearAdminInfo
} = adminSlice.actions;

export default adminSlice.reducer;
