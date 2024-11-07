import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { id, validated } = decoded.UserInfo

        return { id, validated }
    }

    return { username: 'No user found', validated: 'Not found' }
}
export default useAuth