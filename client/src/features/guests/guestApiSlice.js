import { apiSlice } from "app/api/apiSlice";

export const guestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createNewGuest: builder.mutation({
            query: () => ({
                url: "/guest",
                method: "POST",
                // withCredentials: true
            }),
            invalidatesTags: [{ type: "User", id: "ID" }],
        }),
    }),
});

export const { useCreateNewGuestMutation } = guestApiSlice;
