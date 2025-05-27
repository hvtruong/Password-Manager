import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}`, withCredentials: true, credentials: 'include' }),
    tagTypes: ['Password', 'User'],
    endpoints: builder => ({})
})