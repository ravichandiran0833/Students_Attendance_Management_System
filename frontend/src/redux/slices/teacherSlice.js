import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const teacherLogin = createAsyncThunk(
  "teacher/teacherLogin",
  async (teacherData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/login`,
        teacherData,
        {
          withCredentials: true,
        },
      );
      // console.log("res:",response);
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const allDepartments = createAsyncThunk(
  "teacher/allDepartments",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/teacher/allDepartments`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const departmentStudents = createAsyncThunk(
  "teacher/departmentStudents",
  async (data, thunkAPI) => {
    console.log("data:", data);

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/departmentStudents`,
        data,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error);
    }
  },
);

export const submitAttendance = createAsyncThunk(
  "teacher/submitAttendance",
  async (attendanceData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/submitAttendance`,
        attendanceData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const viewStudents = createAsyncThunk(
  "teacher/viewStudents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/viewStudents`,
        data,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editAttendance = createAsyncThunk(
  "teacher/editAttendance",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/editAttendance`,
        data,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const submitEditAttendance = createAsyncThunk(
  "teacher/submitEditAttendance",
  async (data, thunkApi) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/auth/teacher/submitEditAttendance`,
        data,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addStudent = createAsyncThunk(
  "teacher/addStudent",
  async (studentData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/teacher/addStudent`,
        studentData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getSingleStudent = createAsyncThunk(
  "teacher/getSingleStudent",
  async (registerNo, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/teacher/getSingleStudent/${registerNo}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editStudent = createAsyncThunk(
  "teacher/editStudent",
  async ({ id, formData: StudentData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${backendUrl}/api/auth/teacher/editStudent/${id}`,
        StudentData,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error);
      thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
export const deleteStudent = createAsyncThunk(
  "teacher/deleteStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/auth/teacher/deleteStudent/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.message);

      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const dashboardDetails = createAsyncThunk(
  "teacher/dashboardDetails",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/teacher/dashboardDeatils`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      console.log("error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const teacherSlice = createSlice({
  name: "teacherSlice",
  teacherInfo: null,
  isAuthenticated: false,
  allDepartmentsInfo: null,
  departmentStudentsInfo: null,
  submitAttendanceInfo: null,
  viewStudentsInfo: null,
  editAttendanceInfo: null,
  submitEditAttendanceInfo: null,
  addStudentInfo: null,
  getSingleStudentInfo: null,
  editStudentInfo: null,
  deleteStudentInfo: null,
  dashboardDetailsInfo: null,
  initialState: {
    loading: {
      teacherInfo: false,
      allDepartments: false,
      departmentStudents: false,
      submitAttendance: false,
      viewStudents: false,
      editAttendance: false,
      submitEditAttendance: false,
      addStudent: false,
      getSingleStudent: false,
      editStudent: false,
      deleteStudent: false,
      dashboardDetails : false,
    },
    error: {
      teacherInfo: null,
      allDepartments: null,
      departmentStudents: null,
      submitAttendance: null,
      viewStudents: null,
      editAttendance: null,
      submitEditAttendance: null,
      addStudent: null,
      getSingleStudent: null,
      editStudent: null,
      deleteStudent: null,
      dashboardDetails : null
    },
  },
  reducers: {
    clearTeacherInfoError: (state) => {
      state.error.teacherInfo = null;
    },
    clearTeacherInfo: (state) => {
      state.teacherInfo = null;
    },
    clearAllDepartmentsInfo: (state) => {
      state.allDepartmentsInfo = null;
    },
    clearAllDepartmentsError: (state) => {
      state.error.allDepartments = null;
    },
    clearDepartmenStudentsInfo: (state) => {
      state.departmentStudentsInfo = null;
    },
    clearDepartmentStudentsError: (state) => {
      state.error.departmentStudents = null;
    },
    clearSubmitAttendanceError: (state) => {
      state.error.submitAttendance = null;
    },
    clearSubmitAttendanceInfo: (state) => {
      state.submitAttendanceInfo = null;
    },
    clearViewStudentsInfo: (state) => {
      state.viewStudentsInfo = null;
    },
    clearViewStudentsError: (state) => {
      state.error.viewStudents = null;
    },
    clearEditAttendanceInfo: (state) => {
      state.editAttendanceInfo = null;
    },
    clearEditAttendanceError: (state) => {
      state.error.editAttendance = null;
    },
    clearSubmitEditAttendanceInfo: (state) => {
      state.submitEditAttendanceInfo = null;
    },
    clearSubmitEditAttendanceError: (state) => {
      state.error.submitEditAttendance = null;
    },
    clearAddStudentInfo: (state) => {
      state.addStudentInfo = null;
    },
    clearAddStudentError: (state) => {
      state.error.addStudent = null;
    },
    clearSingleStudentInfo: (state) => {
      state.getSingleStudentInfo = null;
    },
    clearSingleStudentError: (state) => {
      state.error.getSingleStudent = null;
    },
    clearEditStudentInfo: (state) => {
      state.editStudentInfo = null;
    },
    clearEditStudentError: (state) => {
      state.error.editStudent = null;
    },
    clearDeleteStudentInfo: (state) => {
      state.deleteStudentInfo = null;
    },
    clearDeleteStudentError: (state) => {
      state.error.deleteStudent = null;
    },
    clearDashboardDetailsInfo : (state)=>{
        state.dashboardDetailsInfo = null
    },
    clearDashboardDetailsError : (state)=>{
        state.error.dashboardDetails = null
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(teacherLogin.pending, (state) => {
        state.loading.teacherInfo = true;
      })
      .addCase(teacherLogin.fulfilled, (state, action) => {
        ((state.loading.teacherInfo = false),
          (state.teacherInfo = action.payload),
          (state.isAuthenticated = true));
      })
      .addCase(teacherLogin.rejected, (state, action) => {
        ((state.loading.teacherInfo = false),
          (state.error.teacherInfo = action.payload));
      })
      .addCase(allDepartments.pending, (state) => {
        state.loading.allDepartments = true;
      })
      .addCase(allDepartments.fulfilled, (state, action) => {
        ((state.loading.allDepartments = false),
          (state.allDepartmentsInfo = action.payload));
      })
      .addCase(allDepartments.rejected, (state, action) => {
        ((state.loading.allDepartments = false),
          (state.error.allDepartments = action.payload));
      })
      .addCase(departmentStudents.pending, (state) => {
        state.loading.departmentStudents = true;
      })
      .addCase(departmentStudents.fulfilled, (state, action) => {
        ((state.loading.departmentStudents = false),
          (state.departmentStudentsInfo = action.payload));
      })
      .addCase(departmentStudents.rejected, (state, action) => {
        ((state.loading.departmentStudents = false),
          (state.error.departmentStudents = action.payload));
      })
      .addCase(submitAttendance.pending, (state) => {
        state.loading.submitAttendance = true;
      })
      .addCase(submitAttendance.fulfilled, (state, action) => {
        ((state.loading.submitAttendance = false),
          (state.submitAttendanceInfo = action.payload));
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        ((state.loading.submitAttendance = false),
          (state.error.submitAttendance = action.payload));
      })
      .addCase(viewStudents.pending, (state) => {
        state.loading.viewStudents = true;
      })
      .addCase(viewStudents.fulfilled, (state, action) => {
        ((state.loading.viewStudents = false),
          (state.viewStudentsInfo = action.payload));
      })
      .addCase(viewStudents.rejected, (state, action) => {
        ((state.loading.viewStudents = false),
          (state.error.viewStudents = action.payload));
      })
      .addCase(editAttendance.pending, (state) => {
        state.loading.editAttendance = true;
      })
      .addCase(editAttendance.fulfilled, (state, action) => {
        ((state.loading.editAttendance = false),
          (state.editAttendanceInfo = action.payload));
      })
      .addCase(editAttendance.rejected, (state, action) => {
        ((state.loading.editAttendance = false),
          (state.error.editAttendance = action.payload));
      })
      .addCase(submitEditAttendance.pending, (state) => {
        state.loading.submitEditAttendance = true;
      })
      .addCase(submitEditAttendance.fulfilled, (state, action) => {
        ((state.loading.submitEditAttendance = false),
          (state.submitEditAttendanceInfo = action.payload));
      })
      .addCase(submitEditAttendance.rejected, (state, action) => {
        ((state.loading.submitEditAttendance = false),
          (state.error.submitEditAttendance = action.payload));
      })
      .addCase(addStudent.pending, (state) => {
        state.loading.addStudent = true;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading.addStudent = false;
        state.addStudentInfo = action.payload;
      })
      .addCase(addStudent.rejected, (state, action) => {
        ((state.loading.addStudent = false),
          (state.error.addStudent = action.payload));
      })
      .addCase(getSingleStudent.pending, (state) => {
        state.loading.getSingleStudent = true;
      })
      .addCase(getSingleStudent.fulfilled, (state, action) => {
        ((state.loading.getSingleStudent = false),
          (state.getSingleStudentInfo = action.payload));
      })
      .addCase(getSingleStudent.rejected, (state, action) => {
        ((state.loading.getSingleStudent = false),
          (state.error.getSingleStudent = action.payload));
      })
      .addCase(editStudent.pending, (state) => {
        state.loading.editStudent = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        ((state.loading.editStudent = false),
          (state.editStudentInfo = action.payload));
      })
      .addCase(editStudent.rejected, (state, action) => {
        ((state.loading.editStudent = false),
          (state.error.editStudent = action.payload));
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading.deleteStudent = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        ((state.loading.deleteStudent = false),
          (state.deleteStudentInfo = action.payload));
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        ((state.loading.deleteStudent = false),
          (state.error.deleteStudent = action.payload));
      })
      .addCase(dashboardDetails.pending, (state)=>{
        state.loading.dashboardDetails = true
      })
      .addCase(dashboardDetails.fulfilled, (state, action)=>{
        state.loading.dashboardDetails = false,
        state.dashboardDetailsInfo = action.payload
      })
      .addCase(dashboardDetails.rejected, (state, action)=>{
        state.loading.dashboardDetails = false,
        state.error.dashboardDetails = action.payload 
      })
  },
});

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
  clearViewStudentsError,
  clearEditAttendanceInfo,
  clearEditAttendanceError,
  clearSubmitEditAttendanceInfo,
  clearSubmitEditAttendanceError,
  clearAddStudentInfo,
  clearAddStudentError,
  clearSingleStudentInfo,
  clearSingleStudentError,
  clearEditStudentInfo,
  clearEditStudentError,
  clearDeleteStudentInfo,
  clearDeleteStudentError,
  clearDashboardDetailsInfo,
  clearDashboardDetailsError
} = teacherSlice.actions;

export default teacherSlice.reducer;
