import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './components/Main'
import Validate from './components/Validate'
import Dashboard from './components/Dashboard'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* public routes */}
                <Route index element={<Main />} />
                <Route path='/validate/:token' index element={<Validate />}/> 

                {/* Protected Routes */}
                <Route element={<RequireAuth isAuthorized={true} />}>
                    <Route path='/dashboard' index element={<Dashboard />} />
                    {/*<Route path='/user' index element={<Validate />}/>*/}
                </Route>

            </Route>
        </Routes>
    )
}

export default App