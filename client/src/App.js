import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import Main from "./components/Main"
import Passwords from "./components/Passwords"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route index element={<Main />} />

                {/* Protected Routes */}
                <Route path="/passwords" index element={<Passwords />} />

            </Route>
        </Routes>
    )
}

export default App