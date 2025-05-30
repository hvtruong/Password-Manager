import { apiSlice } from "app/api/apiSlice";
import { setCredentials, logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        loginAsGuest: builder.mutation({
            query: (credentials) => ({
                url: "/auth/guest",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    setTimeout(() => {
                        dispatch(logOut());
                        dispatch(apiSlice.util.resetApiState());
                    }, 1000);
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken } = data;
                    dispatch(setCredentials({ accessToken }));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginAsGuestMutation,
    useLogoutMutation,
    useRefreshMutation,
} = authApiSlice;
