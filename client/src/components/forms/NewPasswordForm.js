import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../../features/users/userApiSlice'
import { useNavigate } from 'react-router-dom'
import './form.css'

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const USER_REGEX = /^[a-zA-Z0-9._]{4,20}$/
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{6,20}$/

const SignUp = () => {

    // Import add new user module from API slice
    const [addNewUser, { isSuccess }] = useAddNewUserMutation()

    // Hooks to control the new password form

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [repeatPassword, setRepeatPassword] = useState('')
    
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitted, setSubmit] = useState(false)

    const navigate = useNavigate()

    // Validate email address, username, and password everytime it changes
    useEffect(() => {
        setValidEmailAdress(EMAIL_REGEX.test(emailAddress))
    }, [emailAddress])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    // Reset input fields to empty when successfully submitted
    useEffect(() => {
        if (isSuccess) {
            setEmailAddress('')
            setUsername('')
            setPassword('')
            setRepeatPassword('')
            navigate('/')
        }
    }, [isSuccess, navigate])

    // Update the view of input fields after reset
    const onEmailAdressChanged = e => setEmailAddress(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onRepeatPasswordChanged = e => setRepeatPassword(e.target.value)

    // Call the POST API to create new user when everything is valid
    const createNewUser = async (e) => {
        e.preventDefault()
        setSubmit(true)
        if (validEmailAdress && validUsername && validPassword && password === repeatPassword) {
            const response = await addNewUser({ username, password, emailAddress })

            // Handle Bad request status 409
            if (response.error) {
                setErrorMessage(response.error.data.message)
                console.log(errorMessage)
            }
            else {
                setErrorMessage('')
                setSubmit(false)
            }
        }
    }
    
    return (
        <div className='modal fade' id='signupForm' tabIndex='-1' aria-labelledby='signupForm'>
            <div className='modal-dialog modal-content'>
                <form className='box needs-validation' onSubmit={createNewUser}>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5 text-center'>Signup</h1>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'/>
                    </div>
                    
                    <div className='modal-body'>
                        <p className='text-white'> 
                            Please fill in the fields to create new password!
                        </p>

                        <input type='email' name='emailAddress' placeholder='Email address' onChange={onEmailAdressChanged} value={emailAddress} required/>
                        { isSubmitted && (!validEmailAdress || errorMessage === 'Duplicate email address') &&
                            <p style={{ color: '#ff0000' }}>
                                { !validEmailAdress ? 'Invalid email address!' : errorMessage }
                            </p>
                        }
                        
                        <input type='text' name='username' placeholder='Username' onChange={onUsernameChanged} value={username} required/>
                        { isSubmitted && (!validUsername || errorMessage === 'Duplicate username') &&
                            <p style={{ color: '#ff0000' }}>
                                { !validUsername ? 'Invalid username! Username should have at least 4 characters with no special symbols' : errorMessage }
                            </p> 
                        }
                        
                        <input type='password' name='password' placeholder='Password' onChange={onPasswordChanged} value={password} required/>
                        { isSubmitted && !validPassword && 
                            <p style={{ color: '#ff0000' }}>
                                Invalid password! Your password must have at least 6 characters, one upper character, one lower character, one number and one special character
                            </p>
                        }

                        <input type='password' name='repeatPassword' placeholder='Confirm password' onChange={onRepeatPasswordChanged} value={repeatPassword} required/>
                        { isSubmitted && !(password === repeatPassword) && <p style={{ color: '#ff0000' }}>Your password does not match</p> }
                    </div>

                    <div className='modal-footer'>
                        <input type='submit' name='' value='Signup'/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp