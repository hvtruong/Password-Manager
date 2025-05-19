import { Routes, Route, Outlet } from "react-router-dom";
import Home from "pages/Home/Home";
import Validate from "pages/Validate/Validate";
import Dashboard from "pages/Dashboard/Dashboard";
import PersistLogin from "features/auth/PersistLogin";
import RequireAuth from "features/auth/RequireAuth";

const App = () => (
    <Routes>
        <Route path="/" element={<Outlet />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="/validate/:token" index element={<Validate />} />

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" index element={<Dashboard />} />
                </Route>
            </Route>
        </Route>
    </Routes>
);

export default App;
