import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"
import modalReducer from "./modalSlice"

const myStore = configureStore({

    reducer:{
        events:eventReducer,
        modal:modalReducer
    }
})

export type RootState = ReturnType<typeof myStore.getState>;
export default myStore