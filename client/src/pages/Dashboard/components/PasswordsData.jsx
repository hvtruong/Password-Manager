import { toast } from "react-toastify";
import UpdatePasswordForm from "./UpdatePasswordForm";

const PasswordsData = ({
    passwords,
    secretKey,
    isSecretKeyLocked,
    setShouldDataRefetch,
}) =>
    passwords.map((info, index) => (
        <tr key={index}>
            <td>
                <span className="cell-header">URL:</span>
                <button
                    onClick={() =>
                        window.open(
                            info.website,
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                    style={{
                        color: "#0d6efd",
                        background: "none",
                        border: "none",
                        padding: 0,
                        textDecoration: "underline",
                        cursor: "pointer",
                        display: "table-cell",
                    }}
                >
                    {info.website}
                </button>
            </td>
            <td>
                <span className="cell-header">Password:</span>
                {info.password}
            </td>
            <td>
                <span className="cell-header">Actions:</span>
                <button
                    className="add"
                    title="Copy password"
                    data-toggle="tooltip"
                    onClick={() => {
                        navigator.clipboard.writeText(info.password);
                        toast("Password copied to clipboard");
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <i
                        className="fa-solid fa-copy"
                        style={{ color: "#27C46B" }}
                    />
                </button>
                <button
                    className="edit"
                    title="Edit"
                    data-bs-toggle={isSecretKeyLocked ? "modal" : ""}
                    data-bs-target="#updatePasswordForm"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        console.log("Secret key here ", secretKey)
                    }}
                >
                    <i className="fas fa-edit" style={{ color: "#FFC107" }} />
                </button>
                <UpdatePasswordForm
                    secretKey={secretKey}
                    triggerDataRefetch={() => setShouldDataRefetch(true)}
                    index={index}
                />
            </td>
        </tr>
    ));

export default PasswordsData;
