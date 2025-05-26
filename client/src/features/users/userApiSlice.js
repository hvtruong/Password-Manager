import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "app/api/apiSlice";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/user",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map((user) => {
                    user.id = user._id;
                    return user;
                });
                return userAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "ID" },
                        ...result.ids.map((id) => ({ type: "User", id })),
                    ];
                } else return [{ type: "User", id: "ID" }];
            },
        }),
        addNewUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/user",
                method: "POST",
                withCredentials: true,
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{ type: "User", id: "ID" }],
        }),
        updateUser: builder.mutation({
            query: (initialUserData) => ({
                url: "/user",
                method: "PUT",
                withCredentials: true,
                body: initialUserData,
            }),
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/user`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        validateUser: builder.mutation({
            query: ({ token }) => ({
                url: "/validate",
                method: "PATCH",
                body: { token },
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useValidateUserMutation,
} = userApiSlice;

// returns the query result object
export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (userResult) => userResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the user slice of state
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
