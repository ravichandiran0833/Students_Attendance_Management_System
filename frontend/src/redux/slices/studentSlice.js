import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const studentLogin = createAsyncThunk(
  "student/studentLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/student/studentLogin`,
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

export const studentViewAttendance = createAsyncThunk(
  "student/studentViewAttendance",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/auth/student/studentViewAttendance/${id}`,
      );

      return response.data;
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const studentSlice = createSlice({
  name: "studentSlice",
  isAuthenticated: false,
  initialState: {
    studentLoginInfo: null,
    studentViewAttendanceInfo: null,
    loading: {
      studentViewAttendance: false,
      studentLogin: false,
    },
    error: {
      studentViewAttendance: null,
      studentLogin: null,
    },
  },
  reducers: {
    clearStudentLoginInfo: (state) => {
      state.studentLoginInfo = null;
    },
    clearStudentLoginError: (state) => {
      state.error.studentLogin = null;
    },
    clearStudentViewAttendanceInfo: (state) => {
      state.studentViewAttendanceInfo = null;
    },
    clearStudentViewAttendanceError: (state) => {
      state.error.studentViewAttendance = null;
    },
    clearStudentLoginStatus: (state) => {
      if (state.studentLoginInfo) {
       ((state.studentLoginInfo.success = false));
        state.studentLoginInfo.message = "";
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(studentLogin.pending, (state) => {
        state.loading.studentLogin = true;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        ((state.loading.studentLogin = false),
          (state.isAuthenticated = true),
          (state.studentLoginInfo = action.payload));
      })
      .addCase(studentLogin.rejected, (state, action) => {
        ((state.loading.studentLogin = false),
          (state.error.studentLogin = action.payload));
      })

      .addCase(studentViewAttendance.pending, (state) => {
        state.loading.studentViewAttendance = true;
      })
      .addCase(studentViewAttendance.fulfilled, (state, action) => {
        ((state.loading.studentViewAttendance = false),
          (state.studentViewAttendanceInfo = action.payload));
      })
      .addCase(studentViewAttendance.rejected, (state, action) => {
        ((state.loading.studentViewAttendance = false),
          (state.error.studentViewAttendance = action.payload));
      });
  },
});

export const {
  clearStudentLoginInfo,
  clearStudentLoginError,
  clearStudentViewAttendanceError,
  clearStudentViewAttendanceInfo,
  clearStudentLoginStatus
} = studentSlice.actions;

export default studentSlice.reducer;
