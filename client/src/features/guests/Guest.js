import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "auth/authSlice.js";
import { useCreateNewGuestMutation } from "guestApiSlice.js";
import { useLoginMutation } from "auth/authApiSlice.js";
import usePersist from "hooks/usePersist.js";

export const useAsAGuest = async () => {
    // Import modules from API slice
    const [createGuestUser, { isSuccess }] = useCreateNewGuestMutation();
    const [loginAsGuest] = useLoginMutation();

    const [, setErrMsg] = useState("");

    const [, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setPersist(true);
    }, [isSuccess, setPersist]);

    try {
        // Call API to create temporary user
        await createGuestUser();
        // Login the same as a new, regular user with one-time access token
        const { accessToken } = await loginAsGuest().unwrap();
        console.log("Access Token:", accessToken);

        dispatch(setCredentials({ accessToken }));

        navigate("/dashboard");
    } catch (err) {
        console.log(err);
        if (err.status === "FETCH_ERROR") {
            setErrMsg("No Server Response");
        } else {
            setErrMsg(err.data?.message);
        }
    }
};
