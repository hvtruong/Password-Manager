import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { username, status } = decoded.UserInfo

        return { username, status }
    }

    return { username: 'No user found', status: 'Not found' }
}
export default useAuth