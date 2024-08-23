import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
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
                const loadedPasswordsData = responseData.map(passwords => {
                    passwords.id = passwords._id
                    return passwords
                })
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
        addNewPassword: builder.mutation({
            query: initialUserData => ({
                url: '/passwords',
                method: 'POST',
                withCredentials: true,
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        updatePassword: builder.mutation({
            query: initialUserData => ({
                url: '/passwords',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deletePassword: builder.mutation({
            query: ({ id }) => ({
                url: `/passwords`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})

export const { 
    useGetPasswordsDataQuery,
    useAddNewPasswordMutation,
    useUpdatePasswordMutation,
    useDeletePasswordMutation,
} = passwordsApiSlice

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