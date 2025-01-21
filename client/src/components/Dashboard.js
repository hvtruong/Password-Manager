import { useGetPasswordsByIdQuery } from "../features/passwords/passwordApiSlice";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import NavBar from "./navbar/Navbar";
import Table from "./table/Table";
import Footer from "../pages/Footer";
import PulseLoader from "react-spinners/PulseLoader";

const Dashboard = () => {
    // Import password module from API slice
    const { id } = useAuth();

    const {
        data: passwords,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPasswordsByIdQuery(id);

    const [content, setContent] = useState(<PulseLoader color={"#FFF"} />);
    console.log("ABC: ", isSuccess, isLoading, isError, error, passwords);
    useEffect(() => {
        if (isLoading) {
            setContent(<PulseLoader color={"#FFF"} />);
        } else if (isError) {
            setContent(<p className="errmsg">{error?.data?.message}</p>);
        } else if (isSuccess) {
            console.log("Pass 1: ", passwords);
            setContent(
                <>
                    <NavBar location="Dashboard" />
                    <div className="min-vh-100 d-flex flex-column justify-content-between">
                        <Table passwords={passwords} />
                    </div>
                    <Footer />
                </>
            );
        }
    }, [isLoading, isError, isSuccess, error, passwords]);

    return content;
};

export default Dashboard;