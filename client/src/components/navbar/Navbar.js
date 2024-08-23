import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import LogIn from '../forms/Login'
import SignUp from '../forms/Signup'
import logo from '../../images/logo/logo.png'
import { Button } from 'react-bootstrap'
import './navbar.css'

function NavBar() {
    return (
        <Navbar expand='lg' className='py-3'>
            <Container fluid='md' className='navbar-header'>
                <Navbar.Brand href='#' className='me-lg-5'>
                    <img className='logo' src={logo} alt='logo' />
                </Navbar.Brand>
                <div className='d-flex align-items-center order mb-3'>
                    <span className='line'></span>
                    <Button
                        variant='primary'
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#loginForm'
                    >
                        Log in
                    </Button>
                    <LogIn />
                    <Button
                        variant='Secondary'
                        className='btn btn-secondary'
                        data-bs-toggle='modal'
                        data-bs-target='#signupForm'
                    >
                        Sign up
                    </Button>
                    <SignUp />
                </div>
            </Container>
        </Navbar>
    );
}

export default NavBar
