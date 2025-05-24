import { ModalButton } from "components/Buttons";
import LogIn from "pages/Home/components/Login";
import SignUp from "pages/Home/components/Signup";
import EditUser from "pages/Dashboard/components/EditUserForm";
import LogoutNotification from "pages/Dashboard/components/LogoutNotification";

const NavBarButtons = ({ location, role }) => {
    switch (location) {
        case "Home":
            return (
                <>
                    <ModalButton buttonText="Log in" formId="loginForm" />
                    <LogIn />
                    <ModalButton
                        buttonText="Sign up"
                        variant="secondary"
                        className="btn btn-secondary"
                        formId="signupForm"
                    />
                    <SignUp />
                </>
            );
        case "Dashboard":
            return (
                <>
                    {role === "user" && (
                        <>
                            <ModalButton buttonText="Edit" formId="editForm" />
                            <EditUser />
                        </>
                    )}
                    <ModalButton
                        buttonText="Log out"
                        formId="logOutModal"
                        variant="danger"
                        className="btn btn-danger"
                    />
                    <LogoutNotification />
                </>
            );
        default:
            return null;
    }
};

export default NavBarButtons;
