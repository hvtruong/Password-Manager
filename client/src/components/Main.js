import { Link } from 'react-router-dom'
import Properties from "../pages/Properties"
import NavBar from './navbar/Navbar'
import Loading from '../pages/Header'
import Footer from '../pages/Footer'

const Main = () => {
    return (
        <>
            <NavBar location='Main'/>
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <Loading />
                <Properties />
            </div>
            <Footer />
        </>
    )
}
export default Main