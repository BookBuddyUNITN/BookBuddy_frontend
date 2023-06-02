import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../assets/config/general.json";

const LIBRI_API_URL = conf.BASE_URL + "ricerca";

const intialState = {
    libri: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

export const riceraLocale = createAsyncThunk("ricerca/locale", async ({
    location,
    distanzaMassima,
    searchString
}: {
    location: number[],
    distanzaMassima: number,
    searchString: string
}) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const payload = {
        locazione: location,
        distanzaMassima: distanzaMassima,
        searchString: searchString
    }
    const response = await axios.post(LIBRI_API_URL + "/locale", payload, config);
    return response.data;
});

const ricercaSlice = createSlice({
    name: "ricerca",
    initialState: intialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(riceraLocale.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(riceraLocale.fulfilled, (state, action) => {
                state.status = "succeeded";
                if(action.payload.data.libri)
                    state.libri = state.libri.concat(action.payload.data.libri);
            })
            .addCase(riceraLocale.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
    }
})

export const selectAllLibri = (state: any) => state.ricerca.libri;
export const selectLibLriById = ((state: any, libriId: string) => {
    return state.ricera.libri.find((libri: any) => libri._id === libriId
    )
});
export const selectLibriStatus = (state: any) => state.ricerca.status;
export const selectLibriError = (state: any) => state.ricerca.error;

export default ricercaSlice.reducer;



