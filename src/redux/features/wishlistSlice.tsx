import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../assets/config/general.json";


const LIBRI_API_URL = conf.BASE_URL + "wishlist";

const intialState = {
    libri: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: "",
};

export const fetchLibri = createAsyncThunk("wishlist/fetchWishlist", async () => {
    const config = {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    }
    const response = await axios.get(LIBRI_API_URL + "/list?idUtente=1", config);
    return response.data;
});

// export const addLibro = createAsyncThunk("wishlist/addLibro", async (ISBN : string) => {
//     const config = {
//         headers: {
//             "x-access-token": localStorage.getItem("token")
//         }
//     }
//     const response = await axios.post(LIBRI_API_URL + "/add", {
//         ISBN: ISBN
//     }, config);
//     return response.data;
// });

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: intialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchLibri.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchLibri.fulfilled, (state, action) => {
                state.status = "succeeded";
                if(action.payload.data.libri)
                    state.libri = state.libri.concat(action.payload.data.libri);
            })
            .addCase(fetchLibri.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? action.error.message : "error";
            })
    }
})

export const selectAllLibri = (state: any) => state.wishlist.libri;
export const selectLibLriById = ((state: any, libriId: string) => {
    return state.wishlist.libri.find((libri: any) => libri._id === libriId
    )
});
export const selectLibriStatus = (state: any) => state.wishlist.status;
export const selectLibriError = (state: any) => state.wishlist.error;

export default wishlistSlice.reducer;



