import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from './../../api';
import { CONSTANTS } from '../../constants/constants';

export const createTrainingThunk = createAsyncThunk(`${CONSTANTS.TRAINING_SLICE_NAME}/create`,
    async (payload, thunkAPI) => {
        try {
            const {data: {data}} = await API.createTraining(payload);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const getTrainingThunk = createAsyncThunk(`${CONSTANTS.TRAINING_SLICE_NAME}/get`,
    async (payload, thunkAPI) => {
        try {
            const result = await API.getTrainings();
            return result.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const updateTrainingThunk = createAsyncThunk(`${CONSTANTS.TRAINING_SLICE_NAME}/update`,
    async (payload, thunkAPI) => {
        const {id, body} = payload;
        try {
            const {data: {data}} = await API.updateTraining(id, body);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

export const deleteTrainingThunk = createAsyncThunk(`${CONSTANTS.TRAINING_SLICE_NAME}/delete`,
    async (payload, thunkAPI) => {
        try {
            await API.deleteTraining(payload);
            return payload;
        } catch (err) {
            return thunkAPI.rejectWithValue({errors: err.response.data});
        }
    }
);

const initialState = {
    trainings: [],
    isFetching: false,
    error: null,
};

const trainingsSlice = createSlice({
    name: CONSTANTS.TRAINING_SLICE_NAME,
    initialState,
    extraReducers: builder => {
        builder.addCase(createTrainingThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(createTrainingThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.trainings.push(payload);
        });
        builder.addCase(createTrainingThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(getTrainingThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(getTrainingThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.trainings = payload;
        });
        builder.addCase(getTrainingThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(updateTrainingThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(updateTrainingThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.trainings = state.trainings.map(t => t.id === payload.id ? payload: t);
        });
        builder.addCase(updateTrainingThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });

        builder.addCase(deleteTrainingThunk.pending, state => {
            state.isFetching = true;
            state.error = null;
        });
        builder.addCase(deleteTrainingThunk.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.error = null;
            state.trainings = state.trainings.filter(t => t.id !== payload);
        });
        builder.addCase(deleteTrainingThunk.rejected, (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        });
    }
});

const { reducer } = trainingsSlice;

export default reducer;