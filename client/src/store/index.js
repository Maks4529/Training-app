import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './slices/usersSlice';
import trainingsReducer from './slices/trainingsSlice';

const store = configureStore({
    reducer: {
        usersData: usersReducer,
        trainingsData: trainingsReducer,
    },
});

export default store;