import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        console.log("decoded: ", decoded);
        const { id, validated } = decoded.Info

        return { id, validated }
    }

    return { username: 'No user found', validated: 'Not found' }
}
export default useAuth