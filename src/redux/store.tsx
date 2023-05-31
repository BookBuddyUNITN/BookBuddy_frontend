import { configureStore } from "@reduxjs/toolkit";

import libriReducer from "./features/libriSlice";
import wishlistReducer from "./features/wishlistSlice";

const store = configureStore({
    reducer: {
        libri: libriReducer,
        wishlist: wishlistReducer,
    },
});

export default store;
