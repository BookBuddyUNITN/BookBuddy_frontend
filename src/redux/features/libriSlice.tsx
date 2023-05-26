import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const LIBRI_API_URL = "http://localhost:3456/libro";

interface LibriState {
    libri: any[],
    status: string,
    error: string,
}

const intialState = {
    libri: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

export const fetchLibri = createAsyncThunk("libri/fetchLibri", async () => {
    const config = {
        headers: {
            "x-access-token" : localStorage.getItem("token")
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/lista",config);
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
            state.libri = state.libri.concat(action.payload.data.libri);
        })
        .addCase(fetchLibri.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ? action.error.message : "error";
        })
    }
})

export const selectAllLibri = (state : any) => state.libri.libri;
export const selectLibLriById = ((state : any, libriId : string) => {
    return state.libri.libri.find((libri : any) => libri._id === libriId
)});
export const selectLibriStatus = (state : any) => state.libri.status;
export const selectLibriError = (state : any) => state.libri.error;

export default libriSlice.reducer;



