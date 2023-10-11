import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    userId: "63701cc1f03239b7f700000e",
}
 //a higher-order function that accepts the slice name (e.g. token, user, todos), 
 //a set of reducers, and returns a single reducer along with the action creators for that reducer
export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => { // functions that change the global state
            state.mode = state.mode === 'light' ? "dark" : 'light'; // created a function that will change dark mode to light and vice-versa
        }
    }
})

export const { setMode } = globalSlice.actions; //exports the setMode function
export default globalSlice.reducer; //export the globalSlice reducer