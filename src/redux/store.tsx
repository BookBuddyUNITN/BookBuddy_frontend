import { configureStore } from "@reduxjs/toolkit";

import libriReducer from "./features/libriSlice";

const store = configureStore({
    reducer: {
        libri: libriReducer,
    },
});

export default store;
