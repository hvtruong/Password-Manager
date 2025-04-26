import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { id, validated } = decoded.Info
        console.log("Auth id: ", decoded.Info)

        return { id, validated }
    }

    return { id: 'No id found', validated: 'Not found' }
}
export default useAuth