import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import './table.css'
import DisplayJsonData from './DisplayJsonData'
import { Button } from 'react-bootstrap'
import NewPasswordForm from '../forms/NewPasswordForm'

const Table = () => {
    
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('fas fa-eye-slash fa-fw');

    const handleToggle = () => {
        if (type === 'password'){
           setIcon('fas fa-eye fa-fw');
           setType('text')
        } else {
           setIcon('fas fa-eye-slash fa-fw')
           setType('password')
        }
     }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className='container-xl'>
                <div className='table-responsive'>
                    <div className='table-wrapper'>
                        <div className='table-title'>
                            <div className='row'>
                                <div className='talbe-filter col-sm-3 d-flex justify-content-center align-items-center'>
                                    <h2>
                                        <i className='fa-solid fa-vault' style={{color: '#0d6efd'}}></i>
                                        {' '}
                                        Password <b>Vault</b>
                                    </h2>
                                </div>
                                <div className='table-filter col-sm-6 d-flex justify-content-center align-items-center'>
                                    <div className='filter-group'>
                                        <label>Secret Key</label>
                                        <input type={type} className='form-control' />
                                        <i onClick={handleToggle} className={icon} id='eye' style={{marginLeft: '7px'}}></i>
                                        <label>Name</label>
                                        <input type='text' className='form-control' />
                                        <i className='fa fa-search fa-fw' style={{marginLeft: '7px'}}></i>
                                    </div>
                                </div>
                                <div className='table-filter col-sm-3 d-flex justify-content-center align-items-center'>
                                    <div className='filter-group'>
                                        <Button
                                            variant='primary'
                                            className='btn btn-primary'
                                            data-bs-toggle='modal'
                                            data-bs-target='#newPasswordForm'
                                        >
                                            <i className='fa fa-plus add-new'></i>
                                            Add New
                                        </Button>
                                        <NewPasswordForm />
                                        <Button
                                            variant='Secondary'
                                            className='btn btn-secondary'
                                            data-bs-toggle='modal'
                                            data-bs-target='#updatePasswordForm'
                                        >
                                            <i className='fas fa-edit' style={{color: '#0d6efd'}}></i>
                                            Export File
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DisplayJsonData}
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div>
        </motion.div>
    )
}

export default Table