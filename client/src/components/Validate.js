import { useState, useEffect } from 'react'
import { useParams  } from 'react-router-dom'
import { useValidateUserMutation } from '../features/users/userApiSlice'
import { BounceLoader } from 'react-spinners'
import NavBar from './navbar/Navbar'
import Footer from '../pages/Footer'

const Validate = () => {
    const [ validateUser ] = useValidateUserMutation()
    const [ validated, setValidateResponse ] = useState(false)
    const [ isLoading, setLoading ] = useState(true)
  
    const validate = async (token) => {
        const response = await validateUser({ token })
        setLoading(false)
        setValidateResponse(response.data)
    }

    const { token } = useParams()
    useEffect(() => {
        validate(token)
    }, [])

    return (
        <div style={{ textAlign: 'center' }}>
            <NavBar />
            <div className='card' style={{ padding: '60px', borderRadius: '4px', display: 'inline-block', margin: '0 auto'}}>
                    { isLoading && 
                        <div>
                            <BounceLoader color='#4BB543' size={200}/>
                            <p style={{ color: 'white', fontSize: '20px', margin: '0' }}>Please wait a moment!</p>
                        </div>
                    }
                    { !isLoading && !validated &&
                        <div>
                            <div style={{ borderRadius: '200px', height: '200px', width: '200px', margin: '0 auto', background: 'red' }}>
                                <i className="fa-solid fa-xmark" style={{ color: 'white', fontSize: '100px', lineHeight: '200px' }} />
                            </div>
                            <h1 style={{ color: 'red', fontWeight: '900', fontSize: '40px', marginBottom: '10px' }}>Oops!</h1> 
                            <p style={{ color: 'white', fontSize: '20px', margin: '0' }}>The validation token has expired!<br/> We'll redirect you to the home page soon!</p>
                        </div>
                    }
                    { !isLoading && validated &&
                        <div>
                            <div style={{ borderRadius: '200px', height: '200px', width: '200px', margin: '0 auto', background: '#4BB543' }}>
                                <i className='checkmark' style={{ color: 'white', fontSize: '100px', lineHeight: '200px', marginLeft: '-15px' }}>✓</i>
                            </div>
                            <h1 style={{ color: '#88B04B', fontWeight: '900', fontSize: '40px', marginBottom: '10px' }}>Success</h1> 
                            <p style={{ color: 'white', fontSize: '20px', margin: '0' }}>You account has been verified!<br/> We'll redirect you to the home page soon!</p>
                        </div>
                    }
            </div>
            <Footer />
        </div>
    )
}
export default Validate