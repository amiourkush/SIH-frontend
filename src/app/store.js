import { configureStore } from "@reduxjs/toolkit";

import trainReducer from "../features/trains/trainSlice";

export const store = configureStore({
  reducer: {
    trains: trainReducer,
  },
});