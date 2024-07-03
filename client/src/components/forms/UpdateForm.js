import './form.css'

const Update = () => {
    
    return (
        <div className="modal fade" id="updateForm" tabIndex="-1" aria-labelledby="updateForm">
            <div className="modal-dialog modal-content">
                <form className="box needs-validation" noValidate={true}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-center">Signup</h1>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    
                    <div className="modal-body">
                        <p className="text-white"> 
                            Please fill in the fields to register!
                        </p>

                        <input type="email" name="" placeholder="Email address" required/>
                        
                        <input type="text" name="" placeholder="Username" required/>
                        
                        <input type="password" name="" placeholder="Password" required/>

                        <input type="password" name="" placeholder="Confirm password" required/>
                    </div>

                    <div className="modal-footer">
                        <input type="submit" name="" value="Signup" href="#" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update