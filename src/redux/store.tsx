import { configureStore } from "@reduxjs/toolkit";

import libriReducer from "./features/libriSlice";
import wishlistReducer from "./features/wishlistSlice";
import ricercaReducer from "./features/ricercaSlice";
import libreriaPersonaleReducer from "./features/libreriaPersonaleSlice";

const store = configureStore({
    reducer: {
        libri: libriReducer,
        wishlist: wishlistReducer,
        ricerca: ricercaReducer,
        libreriaPersonale: libreriaPersonaleReducer,
    },
});

export default store;
