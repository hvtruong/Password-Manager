import { useState, useEffect } from 'react'

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(sessionStorage.getItem('persist')) || false);

    useEffect(() => {
        sessionStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}
export default usePersist