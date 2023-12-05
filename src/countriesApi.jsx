import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using the REST Countries API as the base URL
export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1/' }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => `all`, // Endpoint to get all countries
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetCountriesQuery } = countriesApi;
