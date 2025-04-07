import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import {pizzaSlice} from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        pizzaSlice: pizzaSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;