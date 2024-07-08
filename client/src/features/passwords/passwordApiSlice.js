import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const passwordsAdapter = createEntityAdapter({})

const initialState = passwordsAdapter.getInitialState()

export const passwordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPasswordsData: builder.query({
            query: () => '/passwords',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedPasswordsData = responseData.map(password => {
                    password.id = password._id
                    return password
                });
                return passwordsAdapter.setAll(initialState, loadedPasswordsData)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Password', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Password', id }))
                    ]
                } else return [{ type: 'Password', id: 'LIST' }]
            }
        }),
    }),
})

export const { useGetPasswordsDataQuery } = passwordsApiSlice

// Return the query result object
export const selectPasswordsDataResult = passwordsApiSlice.endpoints.getPasswordsData.select()

// Create memoized selector
const selectPasswordsData = createSelector(
    selectPasswordsDataResult,
    passwordsResult => passwordsResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPasswordsData,
    selectById: selectPasswordById,
    selectIds: selectPasswordIds
    // Pass in a selector that returns the passwords slice of state
} = passwordsAdapter.getSelectors(state => selectPasswordsData(state) ?? initialState)