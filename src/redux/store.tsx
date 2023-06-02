import { configureStore } from "@reduxjs/toolkit";

import libriReducer from "./features/libriSlice";
import wishlistReducer from "./features/wishlistSlice";
import ricercaReducer from "./features/ricercaSlice";

const store = configureStore({
    reducer: {
        libri: libriReducer,
        wishlist: wishlistReducer,
        ricerca: ricercaReducer,
    },
});

export default store;
