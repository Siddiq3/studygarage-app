import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// ...
import user from './slice/user';

export const store = configureStore({
    reducer: {
        user
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})