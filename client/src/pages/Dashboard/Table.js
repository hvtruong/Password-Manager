import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useGetPasswordsByIdQuery } from "features/passwords/passwordApiSlice.js";
import useAuth from "hooks/useAuth.js";
import TableButtons from "./components/TableButtons.jsx";
import PasswordsData from "./components/PasswordsData.jsx";
import SecretKeyInput from "./components/SecretKeyInput.jsx";
import "assets/stylesheets/table.css";

const Table = () => {
    // Get current user ID from auth context
    const { id } = useAuth();

    // Hooks to control secret key and lock state
    const [type, setType] = useState("text");
    const [secretKeyInput, setSecretKeyInput] = useState("");
    const [isSecretKeyLocked, setIsSecretKeyLocked] = useState(false);

    // State to store the key used for decryption
    const [secretKey, setSecretKey] = useState("");
    const [shouldDataRefetch, setShouldDataRefetch] = useState(false);

    // API hook
    const { data: passwords, refetch } = useGetPasswordsByIdQuery({
        id,
        secretKey: secretKey,
    });

    useEffect(() => {
        if (shouldDataRefetch) {
            refetch();
            setShouldDataRefetch(false);
        }
    }, [shouldDataRefetch, refetch]);

    const handleSecretKeyChange = (e) => setSecretKeyInput(e.target.value);

    // Change states and allow other actions once secret key is locked
    const handleToggle = () => {
        if (type === "password") {
            setIsSecretKeyLocked(false);
            setType("text");
        } else {
            if (secretKeyInput === "") {
                toast("Please enter your secret key");
                return;
            }
            setType("password");
            setIsSecretKeyLocked(true);
            setSecretKey(secretKeyInput);
            setShouldDataRefetch(true);
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
                        {/* Table header with secret key input and action buttons */}
                        <div className="table-title">
                            <div className="row">
                                <div className="table-filter col-sm-8 d-flex justify-content-center align-items-center">
                                    <SecretKeyInput
                                        type={type}
                                        secretKeyInput={secretKeyInput}
                                        isSecretKeyLocked={isSecretKeyLocked}
                                        onChange={handleSecretKeyChange}
                                        onToggle={handleToggle}
                                    />
                                </div>
                                <div className="table-filter col-sm-4 d-flex justify-content-center align-items-center">
                                    <div className="filter-group">
                                        <TableButtons
                                            secretKey={secretKey}
                                            isSecretKeyLocked={
                                                isSecretKeyLocked
                                            }
                                            setShouldDataRefetch={
                                                setShouldDataRefetch
                                            }
                                            passwords={passwords}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Passwords table */}
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Website</th>
                                    <th>Password</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwords && (
                                    <PasswordsData
                                        passwords={passwords}
                                        secretKey={secretKey}
                                        isSecretKeyLocked={isSecretKeyLocked}
                                        setShouldDataRefetch={
                                            setShouldDataRefetch
                                        }
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Table;
