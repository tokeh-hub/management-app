import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/board/boardSlice";
import toggleSlice from "../features/toggle/toggleSlice";

export const store = configureStore({
    reducer: {
            board:boardSlice,
            toggle:toggleSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
    })