import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../assets/config/general.json";


const LIBRI_API_URL = conf.BASE_URL + "wishlist";

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

export const fetchLibri = createAsyncThunk("wishlist/fetchWishlist", async () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/list", config);
    return response.data;
});

export const addLibro = createAsyncThunk("wishlist/addLibro", async (ISBN : string) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.put(LIBRI_API_URL + "/add", {
        isbn: ISBN
    }, config);
    return response.data;
});

export const removeLibro = createAsyncThunk("wishlist/removeLibro", async (ISBN : string) => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.delete(LIBRI_API_URL + "/delete?isbn=" + ISBN, config);
    console.log(response.data);
    return response.data;
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: intialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLibri.pending, (state, action) => {
                state.status.fetchLibri = "loading";
            })
            .addCase(fetchLibri.fulfilled, (state, action) => {
                state.status.fetchLibri = "succeeded";
                if(action.payload.data.wishlist)
                    state.libri = state.libri.concat(action.payload.data.wishlist);
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

export const selectAllLibri = (state: any) => state.wishlist.libri;
export const selectLibLriById = ((state: any, libriId: string) => {
    return state.wishlist.libri.find((libri: any) => libri._id === libriId
    )
});
export const selectFetchLibriStatus = (state: any) => state.wishlist.status.fetchLibri;
export const selectAddLibroStatus = (state: any) => state.wishlist.status.addLibro;
export const selectRemoveLibroStatus = (state: any) => state.wishlist.status.removeLibro;

export const selectLibriError = (state: any) => state.wishlist.error;

export default wishlistSlice.reducer;



