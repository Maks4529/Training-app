import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from './../../api';
import { CONSTANTS } from '../../constants/constants';

export const createUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/create`,
    async (payload, thunkAPI) => {
        try {
            const {data: {data}} = await API.createUser(payload);
            localStorage.setItem('token', data.token);
            return data.user;
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

export const getProfileThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/get/profile`,
    async (payload, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                return thunkAPI.rejectWithValue({errors: 'No token found'});
            }

            const {data: {data}} = await API.getProfile();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
)

export const loginUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/post/login`,
    async (payload, thunkAPI) => {
        try {
            const {data: {data}} = await API.userLogin(payload);
            localStorage.setItem('token', data.token);
            return data.user;
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

export const addTrainingToUserThunk = createAsyncThunk(`${CONSTANTS.USER_SLICE_NAME}/add-training`,
    async (payload, thunkAPI) => {
        try {
            const {data: {data}} = await API.addTrainingToUser(payload);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

const initialState = {
    users: [],
    currentUser: null,
    isFetching: false,
    error: null,
};

const usersSlice = createSlice({
    name: CONSTANTS.USER_SLICE_NAME,
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('token');
            window.location.href  ='/login';
        }
    },
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

        builder.addCase(loginUserThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.currentUser = payload;
        });
        builder.addCase(loginUserThunk.rejected, (state, {payload}) => {
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

        builder.addCase(addTrainingToUserThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(addTrainingToUserThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.currentUser = payload;
        });
        builder.addCase(addTrainingToUserThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(getProfileThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getProfileThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.currentUser = payload;
        });
        builder.addCase(getProfileThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });
    }
});

export const {logout} = usersSlice.actions;
const { reducer } = usersSlice;

export default reducer;