import React from 'react'
import { useState } from "react"
import { motion } from 'framer-motion'
import './table.css'
import DisplayJsonData from './DisplayJsonData'

const Table = () => {
    
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState('fas fa-eye-slash');

    const handleToggle = () => {
        if (type==='password'){
           setIcon('fas fa-eye');
           setType('text')
        } else {
           setIcon('fas fa-eye-slash')
           setType('password')
        }
     }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h2>
                                        <i className="fa-solid fa-vault" style={{color: "#0d6efd"}}></i>
                                        {' '}
                                        Password <b>Vault</b>
                                    </h2>
                                </div>
                                <div className="table-filter col-sm-6">
                                    <div className="filter-group">
                                        <label>Website</label>
                                        <input type="text" className="form-control" />
                                        <button type="button" className="btn btn-primary">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="filter-group">
                                        <label>Secret key</label>
                                        <input type={type} className="form-control" />
                                        {" "}
                                        <i onClick={handleToggle} class={icon} id="eye"></i>
                                    </div>
                                </div>
                                <div className="col-sm-3">		
                                    <button type="button" class="btn btn-primary" >
                                        <i class="fa fa-plus add-new"></i>
                                        Add New
                                    </button>
                                    <button type="button" className="btn btn-secondary">
                                        <i className="fas fa-edit" style={{color: "#0d6efd"}}></i>
                                        <span>Export to Excel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr key = "2">
                                    <th key="1">ID</th>
                                    <th key="2">Website</th>
                                    <th key="3">Username</th>
                                    <th key="4">Password</th>
                                    <th key="5">Actions</th>
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