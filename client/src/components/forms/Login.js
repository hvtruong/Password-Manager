import './form.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../../auth/authSlice'
import { useLoginMutation } from '../../auth/authApiSlice'

const LogIn = () => {
    // Import login module from API slice
    const [login] = useLoginMutation()

    // Hooks to control the login form
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/passwords')
        } catch (err) {
            console.log(err)
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Invalid account! Please try again!')
            } else {
                setErrMsg(err.data?.message)
            }
        }
    }

    // Update the view of input fields after reset
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    
    return (
        <div className='modal fade' id='loginForm' tabIndex='-1' aria-labelledby='loginForm'>
            <div className='modal-dialog modal-content'>
                <form className='box needs-validation' onSubmit={handleSubmit} noValidate={true}>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5 text-center'>Login</h1>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'/>
                    </div>
                    
                    
                    <div className='modal-body'>
                        <p className='text-white'> 
                            Please enter your username and password!
                        </p>
                        
                        <input 
                            type='text'
                            value={username}
                            placeholder='Username'
                            onChange={onUsernameChanged}
                            autoComplete='off'
                            required
                        />
                        
                        <input 
                            type='password'
                            onChange={onPasswordChanged}
                            value={password}
                            placeholder='Password'
                            required
                        />
                    </div>

                    <p style={{ color: '#ff0000' }} aria-live='assertive'>
                        {errMsg}
                    </p>

                    <div className='modal-footer'>
                        <a className='forgot text-white' href='/whatisThis'>Forgot password?</a>
                        
                        <input type='submit' name='' value='Login' href='/#' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn