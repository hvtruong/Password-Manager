import NavBar from './navbar/Navbar'
import Table from './table/Table'
import Footer from '../pages/Footer'

const Passwords = () => {
    return (
        <>
            <NavBar />
            <div className="min-vh-100 d-flex flex-column justify-content-between">
                <Table />
            </div>
            <Footer />
        </>
    )
}
export default Passwords