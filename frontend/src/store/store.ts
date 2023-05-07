import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import city from './slices/citySlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        auth,
        city
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();