import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth";
import { useGetPasswordsByIdQuery } from "../../features/passwords/passwordApiSlice";
import PasswordsData from "./PasswordsData";
import NewPasswordForm from "../forms/NewPasswordForm";
import { csvMaker, download } from "../../utils/export";
import "./table.css";

const SecretKeyInput = ({ type, secretKey, onChange, onToggle, lock }) => (
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
            onChange={onChange}
            disabled={type === "password"}
        />
        <i
            onClick={onToggle}
            className={lock ? "fas fa-lock fa-fw" : "fas fa-unlock fa-fw"}
            id="lock"
            style={{ marginLeft: "7px" }}
        ></i>
    </div>
);

const ActionButtons = ({
    modal,
    secretKey,
    onRefetch,
    onCheckLock,
    passwords,
}) => (
    <div className="filter-group">
        <Button
            variant="primary"
            className="btn btn-primary"
            data-bs-toggle={modal}
            data-bs-target="#newPasswordForm"
            onClick={onCheckLock}
        >
            Add New Password
        </Button>
        <NewPasswordForm secretKey={secretKey} setDataRefetch={onRefetch} />
        <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={() => download(csvMaker(passwords))}
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

    const {
        data: passwords,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetPasswordsByIdQuery({ id, secretKey: decryptKey });

    const [content, setContent] = useState();

    useEffect(() => {
        if (dataRefetch) {
            refetch();
            setDataRefetch(false);
        }
    }, [dataRefetch, refetch]);

    useEffect(() => {
        if (isLoading) {
            setContent(<PulseLoader color={"#FFF"} />);
        } else if (isError) {
            setContent(<p className="errmsg">{error?.data?.message}</p>);
        } else if (isSuccess) {
            setContent(
                <>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PasswordsData(passwords, modal, checkLock)}
                        </tbody>
                    </table>
                </>
            );
        }
        // eslint-disable-next-line
    }, [isLoading, isError, isSuccess, error, passwords, modal]);

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
            setDataRefetch(true);
            setModal("modal");
        }
    };

    const handleSecretKeyChange = (e) => setSecretKey(e.target.value);

    const checkLock = () => {
        console.log("checkLock ", lock);
        if (!lock) {
            toast("Please lock your secret key");
        }
    };

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
                                        onChange={handleSecretKeyChange}
                                        onToggle={handleToggle}
                                        lock={lock}
                                    />
                                </div>
                                <div className="table-filter col-sm-4 d-flex justify-content-center align-items-center">
                                    <ActionButtons
                                        modal={modal}
                                        secretKey={secretKey}
                                        onRefetch={() => setDataRefetch(true)}
                                        onCheckLock={checkLock}
                                        passwords={passwords}
                                    />
                                </div>
                            </div>
                        </div>
                        {content}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Table;
