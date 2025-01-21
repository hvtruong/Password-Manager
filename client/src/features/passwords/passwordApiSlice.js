import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const passwordsAdapter = createEntityAdapter({
    sortComparer: (a, b) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = passwordsAdapter.getInitialState();

export const passwordsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPasswordsById: builder.query({
            query: (userId) => ({
                url: `/passwords/${userId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        }),
        addNewPassword: builder.mutation({
            query: (initialUserData) => ({
                url: "/passwords",
                method: "POST",
                withCredentials: true,
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updatePassword: builder.mutation({
            query: (initialUserData) => ({
                url: "/passwords",
                method: "PATCH",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deletePassword: builder.mutation({
            query: ({ id }) => ({
                url: `/passwords`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetPasswordsByIdQuery,
    useAddNewPasswordMutation,
    useUpdatePasswordMutation,
    useDeletePasswordMutation,
} = passwordsApiSlice;
