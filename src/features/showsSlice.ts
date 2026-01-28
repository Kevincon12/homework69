import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface Show {
    id: number;
    name: string;
    image: string | null;
    summary: string;
}

export interface ShowState {
    items: Show[];
    selectedShow: Show | null;
    loading: boolean;
}

const initialState: ShowState = {
    items: [],
    selectedShow: null,
    loading: false
};

export const fetchShows = createAsyncThunk<Show[], string>(
    'shows/fetchShows',
    async (show) => {
        return [];
    }
);

export const fetchShowsById = createAsyncThunk<Show[], number>(
    'shows/fetchShowsById',
    async (id) => {
        return [];
    }
);

export const showsSlice = createSlice({
    name: 'shows',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => { state.loading = true; })
            .addCase(fetchShows.fulfilled, (state, action: PayloadAction<Show[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchShows.rejected, (state) => { state.loading = false; })

            .addCase(fetchShowsById.pending, (state) => { state.loading = true; })
            .addCase(fetchShowsById.fulfilled, (state, action: PayloadAction<Show>) => {
                state.loading = false;
                state.selectedShow = action.payload;
            })
            .addCase(fetchShowsById.rejected, (state) => { state.loading = false; });
    }
});

export const showsReducer = showsSlice.reducer;