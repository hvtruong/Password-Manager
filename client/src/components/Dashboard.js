import NavBar from "./navbar/Navbar";
import Table from "./table/Table";
import Footer from "../pages/Footer";

const Dashboard = () => {
    return (
        <>
            <NavBar location="Dashboard" />
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <Table />
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
