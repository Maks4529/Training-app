import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from './../../api';
import { CONSTANTS } from '../../constants/constants';

export const createUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/create`,
    async (payload, thunkAPI) => {
        try {
            const {data: {data}} = await API.createUser(payload);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const getUsersThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/get`,
    async (payload, thunkAPI) => {
        try {
            const result = await API.getUsers();
            return result.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const updateUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/update`,
    async (payload, thunkAPI) => {
        const {id, body} = payload;
        try {
            const {data: {data}} = await API.updateUser(id, body);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const deleteUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/delete`,
    async (payload, thunkAPI) => {
        try {
            await API.deleteUser(payload);
            return payload;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

const initialState = {
    users: [],
    isFetching: false,
    error: null,
};

const usersSlice = createSlice({
    name: CONSTANTS.USER_SLICE_NAME,
    initialState,
    extraReducers: builder => {
        builder.addCase(createUserThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(createUserThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.users.push(payload);
        });
        builder.addCase(createUserThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(getUsersThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getUsersThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.users = payload;
        });
        builder.addCase(getUsersThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(updateUserThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(updateUserThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.users = state.users.map(u => u.id === payload.id ? payload: u);
        });
        builder.addCase(updateUserThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(deleteUserThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(deleteUserThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.users = state.users.filter(u => u.id !== payload);
        });
        builder.addCase(deleteUserThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });
    }
});

const { reducer } = usersSlice;

export default reducer;