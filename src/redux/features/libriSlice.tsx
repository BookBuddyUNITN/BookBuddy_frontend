import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LIBRI_API_URL = "http://localhost:3456/libro";

const intialState = {
    libri: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

export const fetchLibri = createAsyncThunk("libri/fetchLibri", async () => {
    const config = {
        headers: {
            "x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaW5jbyI6InBhbGxpbm8iLCJpYXQiOjE2ODQyNjU2NTIsImV4cCI6MTY4NDM1MjA1Mn0.DjfI8_Z13NuWoHmZQ6LWODvrrCjezhDzG8p6g-FHNm4"
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/lista",config);
    console.log(response.data);
    return response.data;
});

const libriSlice = createSlice({
    name: "libri",
    initialState: intialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchLibri.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchLibri.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.libri = state.libri.concat(action.payload);
        })
        .addCase(fetchLibri.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ? action.error.message : "error";
        })
    }
})

export const selectAllLibri = (state : any) => state.libri.libri;
export const selectLibriById = (state : any, libriId : string) => state.libri.libri.find((libri : any) => libri.id === libriId);
export const selectLibriStatus = (state : any) => state.libri.status;
export const selectLibriError = (state : any) => state.libri.error;

export default libriSlice.reducer;



