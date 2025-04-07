import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loader: {
        active: false,
    }
};


const commonSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoaderState: (state, action) => {
            state.loader.active = action.payload;
        }
    }
});

export const { setLoaderState } = commonSlice.actions;

export default commonSlice.reducer