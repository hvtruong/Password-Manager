import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LogIn from "../forms/Login";
import SignUp from "../forms/Signup";
import EditUser from "../forms/EditUser";
import LogoutNotification from "../forms/LogoutNotification";
import logo from "../../images/logo/logo.png";
import "./navbar.css";

const NavBar = ({ location, role }) => {
    const loginButton = (
        <>
            <Button
                variant="primary"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#loginForm"
            >
                Log in
            </Button>
            <LogIn />
        </>
    );

    const signupButton = (
        <>
            <Button
                variant="Secondary"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#signupForm"
            >
                Sign up
            </Button>
            <SignUp />
        </>
    );

    const editButton = (
        <>
            <Button
                variant="primary"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#signupForm"
            >
                Edit
            </Button>
            <EditUser />
        </>
    );

    const logoutButton = (
        <>
            <Button
                variant="Secondary"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#logOutModal"
            >
                Log out
            </Button>
            <LogoutNotification />
        </>
    );

    let buttonContent;
    if (location === "Main") {
        buttonContent = (
            <>
                {loginButton}
                {signupButton}
            </>
        );
    } else if (location === "Dashboard") {
        buttonContent = (
            <>
                {role === "user" && { editButton }}
                {logoutButton}
            </>
        );
    }

    let content;
    content = (
        <Navbar expand="lg" className="py-3">
            <Container fluid="md" className="navbar-header">
                <Navbar.Brand href="#" className="me-lg-5">
                    <img className="logo" src={logo} alt="logo" />
                </Navbar.Brand>

                <div className="d-flex align-items-center order mb-3">
                    <span className="line"></span>
                    {buttonContent}
                </div>
            </Container>
        </Navbar>
    );

    return content;
};

export default NavBar;
