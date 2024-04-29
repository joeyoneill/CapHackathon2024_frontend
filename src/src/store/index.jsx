import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";

// TODO: imports for the reducers

// TODO: configure the store
const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

// TODO: export the store
export default store;