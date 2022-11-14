import { configureStore } from '@reduxjs/toolkit';
import fileSlice from './fileSlice';

export const store = configureStore({
    reducer: {
        files: fileSlice,
    },
});
