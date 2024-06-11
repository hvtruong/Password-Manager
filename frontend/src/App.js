import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Main from './components/Main'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'

function App() {
  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />

      <Route path="dash" element={<DashLayout />}>

        <Route index element={<Welcome />} />

      </Route>{/* End Dash */}

    </Route>
  </Routes>
  );
}

export default App;