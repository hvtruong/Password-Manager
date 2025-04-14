import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './components/Main'
import Validate from './components/Validate'
import Dashboard from './components/Dashboard'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<Main />} />
                <Route path='/validate/:token' index element={<Validate />}/> 

                {/* Protected Routes */}
                <Route element={<PersistLogin />} >
                    <Route element={<RequireAuth />} >
                        <Route path='/dashboard' index element={<Dashboard />} />
                    </Route>
                </Route>

            </Route>
        </Routes>
    )
}

export default App