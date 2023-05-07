import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import $api from "../../http";
import {IUser} from "../../models/IUser";
import axios from "axios";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface UserState {
    user: IUser | null;
    isAuth: boolean;
    status: Status;
    isLoading: boolean;
}
export type IParamsLogin = {
    email: string;
    password: string;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    status: Status.LOADING,
    isLoading: true
}
export const login = createAsyncThunk<UserState, IParamsLogin>('auth/login', async (params, thunkAPI) => {
    try {
        const {email, password} = params
        const response = await $api.post('/login', {email, password})
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
})
export const checkAuth = createAsyncThunk<UserState>('auth/checkAuth', async (thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/api/refresh', {withCredentials: true,})
        console.log(response.data)
        return response.data;
    } catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(e.response.data)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = null;
            })
            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                // @ts-ignore
                localStorage.setItem('token', action.payload.accessToken);
                state.user = action.payload.user;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = null;
            })
    }
})

export default authSlice.reducer