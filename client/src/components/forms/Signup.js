import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from '../../features/users/userApiSlice'
import { useNavigate } from 'react-router-dom'
import './form.css'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const SignUp = () => {

    const [addNewUser, {
        isLoading,
        isSuccess
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [emailAddress, setEmailAddress] = useState('')
    const [validEmailAdress, setValidEmailAdress] = useState(false)
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    useEffect(() => {
        setValidEmailAdress(USER_REGEX.test(emailAddress))
    }, [emailAddress])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setEmailAddress('')
            setUsername('')
            setPassword('')
            navigate('/user')
        }
    }, [isSuccess, navigate])

    const onEmailAdressChanged = e => setEmailAddress(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (true) {
            console.log(username)
            console.log(password)
            console.log(emailAddress)
            await addNewUser({ username, password, emailAddress })
        }
    }
    
    return (
        <div className='modal fade' id='signupForm' tabIndex='-1' aria-labelledby='signupForm'>
            <div className='modal-dialog modal-content'>
                <form className='box needs-validation' noValidate={true}>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5 text-center'>Signup</h1>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'/>
                    </div>
                    
                    <div className='modal-body'>
                        <p className='text-white'> 
                            Please fill in the fields to register!
                        </p>

                        <input type='email' name='emailAddress' placeholder='Email address' onChange={onEmailAdressChanged} required/>
                        
                        <input type='text' name='username' placeholder='Username' onChange={onUsernameChanged} required/>
                        
                        <input type='password' name='password' placeholder='Password' onChange={onPasswordChanged} required/>

                        <input type='password' name='repeatPassword' placeholder='Confirm password' required/>
                    </div>

                    <div className='modal-footer'>
                        <input type='submit' name='' value='Signup' onClick={onSaveUserClicked}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp