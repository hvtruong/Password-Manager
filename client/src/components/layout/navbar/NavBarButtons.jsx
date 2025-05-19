import { Button } from "react-bootstrap";
import LogIn from "pages/Home/components/Login";
import SignUp from "pages/Home/components/Signup";
import EditUser from "pages/Dashboard/components/EditUserForm";
import LogoutNotification from "pages/Dashboard/components/LogoutNotification";

const NavBarButtons = ({ location, role }) => {
    switch (location) {
        case "Home":
            return (
                <>
                    {loginButton}
                    {signupButton}
                </>
            );
        case "Dashboard":
            return (
                <>
                    {role === "user" && editButton}
                    {logoutButton}
                </>
            );
        default:
            return null;
    }
};

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
            variant="secondary"
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
            variant="danger"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#logOutModal"
        >
            Log out
        </Button>
        <LogoutNotification />
    </>
);

export default NavBarButtons;
