import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

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
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${show}`);
        return response.data.map((item) => ({
            id: item.show.id,
            name: item.show.name,
            image: item.show.image?.medium || null,
            summary: item.show.summary || ""
        }));
    }
);

export const fetchShowsById = createAsyncThunk<Show, number>(
    'shows/fetchShowsById',
    async (id) => {
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        const show = response.data;
        return {
            id: show.id,
            name: show.name,
            image: show.image?.medium || null,
            summary: show.summary || ""
        };
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