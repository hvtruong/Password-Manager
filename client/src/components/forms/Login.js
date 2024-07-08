import './form.css'

const LogIn = () => {
    
    return (
        <div className='modal fade' id='loginForm' tabIndex='-1' aria-labelledby='loginForm'>
            <div className='modal-dialog modal-content'>
                <form className='box needs-validation' noValidate={true}>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5 text-center'>Login</h1>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'/>
                    </div>
                    
                    <div className='modal-body'>
                        <p className='text-white'> 
                            Please enter your username and password!
                        </p>
                        
                        <input type='text' name='' placeholder='Username' required/>
                        
                        <input type='password' name='' placeholder='Password' required/>
                    </div>

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