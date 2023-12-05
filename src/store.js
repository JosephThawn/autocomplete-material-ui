import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "./countriesApi"; // We'll create this file next

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
