import NavBar from "./navbar/NavBar";
import Footer from "./Footer";

const Layout = ({ location, children }) => (
    <>
        <NavBar location={location} />
        {children}
        <Footer />
    </>
);
export default Layout;
