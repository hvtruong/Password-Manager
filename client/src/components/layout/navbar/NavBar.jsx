import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavBarButtons from "./NavBarButtons";
import logo from "assets/images/logo/logo.png";
import "./NavBar.css";

const NavBar = ({ location }) => (
    <Navbar expand="lg" className="py-3">
        <Container fluid="md" className="navbar-header">
            <Navbar.Brand href="#" className="me-lg-5">
                <img className="logo" src={logo} alt="logo" />
            </Navbar.Brand>
            <div className="d-flex align-items-center order mb-3">
                <span className="line"></span>
                <NavBarButtons location={location}/>
            </div>
        </Container>
    </Navbar>
);

export default NavBar;
