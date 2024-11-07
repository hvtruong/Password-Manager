import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import PulseLoader from "react-spinners/PulseLoader"
import { useLogoutMutation } from "../../features/auth/authApiSlice"
import LogIn from "../forms/Login"
import SignUp from "../forms/Signup"
import logo from "../../images/logo/logo.png"
import "./navbar.css"

const NavBar = ({ location }) => 
{
    const navigate = useNavigate()

    const [logout,
        {
            isLoading,
            isSuccess,
            error
        }
    ] = useLogoutMutation()

    const logoutHandler = async () => {
        try 
        {
            await logout().unwrap(); // Trigger mutation and await success
      
            // Success, redirect to home
            navigate("/", { replace: true });
        } 
        catch(error) 
        {
            console.log(error)
        }
      };

    useEffect(() => 
    {
        if (isSuccess)
        {
            navigate("/")
        }
    }, [isSuccess, navigate])

    const loginButton = 
    (
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
    )

    const signupButton = 
    (
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
    )

    const editButton = 
    (
        <>
            <Button
                variant="primary"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#loginForm"
            >
                Edit User
            </Button>
            <LogIn />
        </>
    )

    const logoutButton = 
    (
        <Button
            variant="Secondary"
            className="btn btn-secondary"
            onClick={logoutHandler}
        >
            Log out
        </Button>
    )

    let buttonContent
    if (isLoading) 
    {
        buttonContent = <PulseLoader color={"#FFF"} />
    } 
    else 
    {
        if (location === "Main") 
        {
            buttonContent = 
            (
                <>
                    {loginButton}
                    {signupButton}
                </>
            )
        }
        else if (location === "Dashboard")
        {
            buttonContent = 
            (
                <>
                    {editButton}
                    {logoutButton}
                </>
            )
        }
    }

    return (
        <Navbar expand="lg" className="py-3">
            <Container fluid="md" className="navbar-header">
                <Navbar.Brand href="#" className="me-lg-5">
                    <img className="logo" src={logo} alt="logo" />
                </Navbar.Brand>

                <p style={{ color: "#ff0000" }} aria-live="assertive">
                    {error?.data?.message}
                </p>

                <div className="d-flex align-items-center order mb-3">
                    <span className="line"></span>
                    {buttonContent}
                </div>
            </Container>
        </Navbar>
    )
}

export default NavBar
