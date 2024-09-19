import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4646', withCredentials: true, credentials: 'include' }),
    tagTypes: ['Password', 'User'],
    endpoints: builder => ({})
})