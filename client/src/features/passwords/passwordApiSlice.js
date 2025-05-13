// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// const passwordsAdapter = createEntityAdapter({
//     sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
// });

// const initialState = passwordsAdapter.getInitialState();

export const passwordsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPasswordsById: builder.query({
            query: (arg) => ({
                url: `/passwords/${arg.id}?secretKey=${arg.secretKey}`,
                method: "GET",
                validateStatus: (response, result) => response.status === 200 && !result.isError,
            })
        }),
        addNewPassword: builder.mutation({
            query: (initialUserData) => ({
                url: "/passwords",
                method: "POST",
                withCredentials: true,
                body: initialUserData,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updatePassword: builder.mutation({
            query: (initialUserData) => ({
                url: "/passwords",
                method: "PUT",
                withCredentials: true,
                body: initialUserData,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
        deletePassword: builder.mutation({
            query: (initialUserData) => ({
                url: `/passwords`,
                method: "DELETE",
                body: initialUserData,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
    }),
});

export const {
    useGetPasswordsByIdQuery,
    useAddNewPasswordMutation,
    useUpdatePasswordMutation,
    useDeletePasswordMutation,
} = passwordsApiSlice;
