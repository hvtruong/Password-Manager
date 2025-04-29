import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import { useGetPasswordsByIdQuery } from "../../features/passwords/passwordApiSlice";
import DisplayPasswordData from "./DisplayPasswordData";
import NewPasswordForm from "../forms/NewPasswordForm";
import "./table.css";

const SecretKeyInput = ({ type, secretKey, handleSecretKeyChange, handleToggle, lock }) => (
    <div className="filter-group">
        <label>Secret Key</label>
        <input
            type={type}
            className="form-control"
            name="secretKey"
            id="secretKey"
            placeholder="Enter your secret key"
            autoComplete="off"
            required
            value={secretKey}
            onChange={handleSecretKeyChange}
            disabled={type === "password"}
        />
        <i
            onClick={handleToggle}
            className={lock}
            id="lock"
            style={{ marginLeft: "7px" }}
        ></i>
    </div>
);

const test = (modal) => {
    console.log("This is the modal:", modal);
    return modal;
}

const ActionButtons = ({ modal, secretKey, setDataRefetch, setModal, lock }) => (
    <div className="filter-group">
        <Button
            variant="primary"
            className="btn btn-primary bg-success"
            onClick={() => {
                if (lock === false) {
                    toast("Please lock your secret key");
                    return;
                }
            }}
        >
            Decrypt
        </Button>
        <Button
            variant="primary"
            className="btn btn-primary"s
            data-bs-toggle={modal}
            data-bs-target="#newPasswordForm"
            onClick={() => {
                if (lock === false) {
                    toast("Please lock your secret key");
                    return;
                }
                setModal("modal");
            }}
        >
            Add New Password
        </Button>
        <NewPasswordForm
            secretKey={secretKey}
            setDataRefetch={() => setDataRefetch(true)}
            closeModal={() => setModal("")}
        />
        <Button
            variant="Secondary"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#updatePasswordForm"
        >
            Export File
        </Button>
    </div>
);

const Table = () => {
    const { id } = useAuth();
    const [type, setType] = useState("text");
    const [lock, setLock] = useState(false);
    const [modal, setModal] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [decryptKey, setDecryptKey] = useState("");
    const [dataRefetch, setDataRefetch] = useState(false);

    const { data: passwords, isLoading, isSuccess, isError, error, refetch } =
        useGetPasswordsByIdQuery({ id, secretKey: decryptKey });

    const [content, setContent] = useState(<PulseLoader color={"#FFF"} />);

    useEffect(() => {
        console.log("Data refetch triggered ", dataRefetch);
        if (dataRefetch) {
            refetch();
            setDataRefetch(false);
        }
    }, [dataRefetch]);

    useEffect(() => {
        if (isLoading) {
            setContent(<PulseLoader color={"#FFF"} />);
        } else if (isError) {
            setContent(<p className="errmsg">{error?.data?.message}</p>);
        } else if (isSuccess) {
            setContent(DisplayPasswordData(passwords, secretKey));
        }
    }, [isLoading, isError, isSuccess, error, passwords, secretKey]);

    const handleToggle = () => {
        if (type === "password") {
            setLock(false);
            setType("text");
            setModal("");
        } else {
            if (!secretKey) {
                toast("Please enter your secret key");
                return;
            }
            setLock(true);
            setType("password");
            setDecryptKey(secretKey);
            setModal("modal");
        }
    };

    const handleSecretKeyChange = (e) => setSecretKey(e.target.value);

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
                                <div className="table-filter col-sm-8 d-flex justify-content-center align-items-center">
                                    <ToastContainer position="top-center" />
                                    <SecretKeyInput
                                        type={type}
                                        secretKey={secretKey}
                                        handleSecretKeyChange={handleSecretKeyChange}
                                        handleToggle={handleToggle}
                                        lock={lock ? "fas fa-lock fa-fw" : "fas fa-unlock fa-fw"}
                                    />
                                </div>
                                <div className="table-filter col-sm-4 d-flex justify-content-center align-items-center">
                                    <ActionButtons
                                        modal={modal}
                                        secretKey={secretKey}
                                        setDataRefetch={setDataRefetch}
                                        setModal={setModal}
                                        lock={lock}
                                    />
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{content}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Table;
