import {createAsyncThunk, createSlice, isFulfilled, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {authService} from "../../services/auth.service";
import {IAuth} from "../../interfaces/IAuth";
import {IUser} from "../../interfaces/IUser";

type authSliceType = {
    me: IUser | null,
    errors: boolean | null,
}

const authSliceInitialState: authSliceType = {
    me: null,
    errors: null,
};

// const login = createAsyncThunk("authSLice/login", async (data: IAuth, thunkApi) => {
//     try {
//         const user = await authService.login(data);
//         return thunkApi.fulfillWithValue(user);
//     } catch (e) {
//         return thunkApi.rejectWithValue(e);
//     }
// });

const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        console.log({user}, "!!!!!!!!!!!!!!!!");
        try {
            return await authService.login(user);
        } catch (e) {
            return rejectWithValue(e);
        }

    }
)

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }

    }
)

export const authSlice = createSlice({
    name: "authSLice",
    initialState: authSliceInitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload;
            })
            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload;
            })
            .addMatcher(isRejected(login), (state) => {
                state.errors = true;
            })
            .addMatcher(isFulfilled(login), (state) => {
                state.errors = false;
            })

    },
});

export const authSliceActions = {...authSlice.actions, login, me};

//
// import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
// import { IUser } from "../../interfaces/IUser";
// import { IAuth } from "../../interfaces/IAuth";
// import { authService } from "../../services/auth.service";
//
// interface IState {
//     me: IUser | null,
//     error: boolean | null
// }
//
// const initialState: IState = {
//     me: null,
//     error: null
// }
//
// const login = createAsyncThunk<IUser, { user: IAuth }>(
//     'authSlice/login',
//     async ({user}, {rejectWithValue}) => {
//         try {
//             return await authService.login(user)
//         } catch (e) {
//             return rejectWithValue(e)
//         }
//
//     }
// )
// const authSlice = createSlice({
//     name: 'authSlice',
//     initialState,
//     reducers: {},
//     extraReducers: builder =>
//         builder
//             .addCase(login.fulfilled, (state, action) => {
//                 state.me = action.payload
//             })
//             .addMatcher(isRejected(login), state => {
//                 state.error = true
//             })
//             .addMatcher(isFulfilled(login), state => {
//                 state.error = false
//             })
// });
//
// const {reducer: authReducer, actions} = authSlice;
//
// const authActions = {
//     ...actions,
//     login
// }
//
// export {
//     authReducer,
//     authActions
// }