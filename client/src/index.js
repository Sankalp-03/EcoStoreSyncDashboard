import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'; // sets up a well defined redux store
import globalReducer from "state";
import { Provider } from "react-redux"; //makes redux store available to any component that requires it.
import { setupListeners } from "@reduxjs/toolkit/query"; // a utility used to enable refetchOnFocus and refetchOnReconnect behaviors, used to pass the dispatch function from your redux store
import { api } from "state/api";
// creating our store - we create new store to add good defaults for better developments.
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer, // finally we are going to set the reducer path
  },
  middleware: (getDefault) => getDefault().concat(api.middleware), // adds api middleware to the default middleware stack
});
setupListeners(store.dispatch);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
