import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAdmin = createAsyncThunk("admin/fetchAdmin",async(adminData, thunkAPI)=>{
    try {
        const response = await axios.post("http://localhost:3000/api/auth/admin", adminData)
        console.log("res:",response.data);
        return response.data
        
    } catch (error) {
        console.log("error:",error);
        return thunkAPI.rejectWithValue(error.response.data)
        
    }
})


const adminSlice = createSlice({
    name : "adminSlice",
    initialState:{
        adminInfo : [],
        loading : false,
        error : null
    },
    reducers :{

    },
    extraReducers :(builder)=>{
        builder

        .addCase(fetchAdmin.pending, (state,)=>{
            state.loading = true
        })
        .addCase(fetchAdmin.fulfilled, (state, action)=>{
            state.loading = false;
            state.adminInfo = action.payload
        })
        .addCase(fetchAdmin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }

})

export default adminSlice.reducer