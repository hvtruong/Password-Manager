import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { id, role } = decoded.Info

        return { id, role }
    }

    return { id: 'No id found', role: 'Not found' }
}
export default useAuth