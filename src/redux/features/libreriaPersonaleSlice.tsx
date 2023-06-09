import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../assets/config/general.json";


const LIBRI_API_URL = conf.BASE_URL + "libreriaPersonale";

const intialState = {
    libri: [],
    status: {
        fetchLibri: "idle",
        addLibro: "idle",
        removeLibro: "idle",
    }, //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
} as {
    libri: any[],
    status: {
        fetchLibri: string,
        addLibro: string,
        removeLibro: string,
    },
    error: string,
};

export const fetchLibri = createAsyncThunk("libreriaPersonale/fetchLibreria", async () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/list", config);
    return response.data;
});

export const addLibro = createAsyncThunk("libreriaPersonale/addLibro", async ({ISBN, location} : {
    ISBN: string,
    location: [number, number]
}) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.post(LIBRI_API_URL + "/", {
        isbn: ISBN,
        locazione: location
    }, config);
    return response.data;
});

export const removeLibro = createAsyncThunk("libreriaPersonale/removeLibro", async (ISBN : string) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.delete(LIBRI_API_URL + "?isbn=" + ISBN, config);
    return response.data;
});

const LibreriaPersonaleSlice = createSlice({
    name: "libreriaPersonale",
    initialState: intialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLibri.pending, (state, action) => {
                state.status.fetchLibri = "loading";
            })
            .addCase(fetchLibri.fulfilled, (state, action) => {
                state.status.fetchLibri = "succeeded";
                if(action.payload.data.libri)
                    state.libri = state.libri.concat(action.payload.data.libri);
            })
            .addCase(fetchLibri.rejected, (state, action) => {
                state.status.fetchLibri = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
            .addCase(addLibro.pending, (state, action) => {
                state.status.addLibro = "loading";
            })
            .addCase(addLibro.fulfilled, (state, action) => {
                state.status.addLibro = "succeeded";
                state.libri = state.libri.concat(action.payload.data.libro);
            })
            .addCase(addLibro.rejected, (state, action) => {
                state.status.addLibro = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
            .addCase(removeLibro.pending, (state, action) => {
                state.status.removeLibro = "loading";
            })
            .addCase(removeLibro.fulfilled, (state, action) => {
                state.status.removeLibro = "succeeded";
                state.libri = state.libri.filter((libro) => libro.ISBN !== action.payload.data.isbn);
            })
            .addCase(removeLibro.rejected, (state, action) => {
                state.status.removeLibro = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
    }
})

export const selectAllLibri = (state: any) => state.libreriaPersonale.libri;
export const selectLibLriById = ((state: any, libriId: string) => {
    return state.libreriaPersonale.libri.find((libri: any) => libri._id === libriId
    )
});
export const selectFetchLibriStatus = (state: any) => state.libreriaPersonale.status.fetchLibri;
export const selectAddLibroStatus = (state: any) => state.libreriaPersonale.status.addLibro;
export const selectRemoveLibroStatus = (state: any) => state.libreriaPersonale.status.removeLibro;

export const selectLibriError = (state: any) => state.libreriaPersonale.error;

export default LibreriaPersonaleSlice.reducer;



