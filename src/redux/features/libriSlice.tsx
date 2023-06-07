import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../assets/config/general.json";

const LIBRI_API_URL = conf.BASE_URL + "libro";
const RECENSIONI_API_URL = conf.BASE_URL + "recensioni";

interface reviewInterface {
    isbn: string,
    voto: number,
    testo: string,
    
}

const intialState = {
    libri: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

export const fetchLibri = createAsyncThunk("libri/fetchLibri", async () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/lista", config);
    return response.data;
});

export const leaveReview = createAsyncThunk("libri/leaveReview", async (data: reviewInterface) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.post(RECENSIONI_API_URL + "/libri", data, config);
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
            .addCase(leaveReview.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(leaveReview.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.libri = state.libri.map((libro: any) => {
                    if (libro.ISBN === action.payload.data.libro.ISBN) {
                        return { ...libro, recensioni: [...libro.recensioni, action.payload.data.recensione] };
                    }
                    return libro;
                }) as any;
            })
            .addCase(leaveReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
    }
})

export const selectAllLibri = (state: any) => state.libri.libri;
export const selectLibLriById = ((state: any, libriId: string) => {
    return state.libri.libri.find((libri: any) => libri._id === libriId
    )
});
export const selectLibriStatus = (state: any) => state.libri.status;
export const selectLibriError = (state: any) => state.libri.error;

export default libriSlice.reducer;



