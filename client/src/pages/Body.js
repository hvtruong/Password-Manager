import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice.js";
import { useCreateNewGuestMutation } from "../features/guests/guestApiSlice.js";
import { useLoginAsGuestMutation } from "../features/auth/authApiSlice.js";
import usePersist from "../hooks/usePersist.js";
import AnimationTitles from "../components/functions/AnimationTitles.js";
import VideoPlayer from "../components/functions/VideoPlayer.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Body = () => {
    // Import modules from API slice
    const [createGuestUser, { isSuccess }] = useCreateNewGuestMutation();
    const [loginAsGuest] = useLoginAsGuestMutation();

    const [, setErrMsg] = useState("");

    const [, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // eslint-disable-next-line
        setPersist(true);
    }, [isSuccess, setPersist]);

    const handleGuest = async (e) => {
        e.preventDefault();
        try {
            // Call API to create temporary user
            const response = await createGuestUser().unwrap();
            const guestId = response.guestId;
            // Login the same as a new, regular user with one-time access token
            const { accessToken } = await loginAsGuest({ guestId }).unwrap();

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

    let content;
    content = (
        <div className="loading position-relative">
            <Container className="d-flex justify-content-between align-items-center gap-md-5 flex-column flex-md-row mt-3 mt-xl-4 overflow-hidden">
                <motion.div
                    initial={{ x: -400 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <AnimationTitles
                        title="Warm welcome to PassVault"
                        text="Meet the modern passwords management. Streamline passwords with your own encryption"
                    />
                    <Button
                        className="m-0 my-3 px-5 py-2 fs-5 fw-bold"
                        onClick={handleGuest}
                    >
                        Explore as a guest
                    </Button>
                    <div
                        style={{ color: "white" }}
                        className="d-none d-md-flex justify-content-between align-items-center my-4"
                    >
                        <div>
                            <h5 className="fw-bold fs-1">1000K+</h5>
                            <span className="gray-100">passwords storage</span>
                        </div>
                        <div>
                            <h5 className="fw-bold fs-1">AES-256</h5>
                            <span className="gray-100">
                                Gold-standard encryption
                            </span>
                        </div>
                        <div>
                            <h5 className="fw-bold fs-1">Offline</h5>
                            <span className="gray-100">storage</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ x: 400 }}
                    animate={{ x: 40 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="cards">
                        <VideoPlayer></VideoPlayer>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ color: "white" }}
                    className="d-md-none d-flex justify-content-between align-items-center my-4 features"
                >
                    <div>
                        <h5 className="fw-bold fs-1">1K+</h5>
                        <span className="gray-100">passwords storage</span>
                    </div>
                    <div>
                        <h5 className="fw-bold fs-1">Unique</h5>
                        <span className="gray-100">encryption</span>
                    </div>
                    <div>
                        <h5 className="fw-bold fs-1">Offline</h5>
                        <span className="gray-100">storage</span>
                    </div>
                </motion.div>
            </Container>
        </div>
    );

    return content;
};

export default Body;
