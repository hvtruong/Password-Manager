import NavBar from "./navbar/Navbar";
import Body from "../pages/Body";
import Footer from "../pages/Footer";

const Main = () => {
    return (
        <>
            <NavBar location="Main" />
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <Body />
            </div>
            <Footer />
        </>
    );
};
export default Main;
