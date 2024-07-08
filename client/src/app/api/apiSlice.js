import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4646' }),
    tagTypes: ['Password', 'User'],
    endpoints: builder => ({})
})