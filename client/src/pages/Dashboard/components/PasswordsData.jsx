import { toast } from "react-toastify";
import EditPasswordForm from "./EditPasswordForm";
import DeleteNotification from "./DeleteNotification";

const PasswordsData = ({
    passwords,
    secretKey,
    isSecretKeyLocked,
    triggerDataRefetch,
}) =>
    passwords.map((info, index) => (
        <tr key={index}>
            <td>
                <span className="cell-header">URL:</span>
                <button
                    onClick={() =>
                        window.open(
                            addHttps(info.website),
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
                <span className="cell-header">Operations:</span>
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
                    onClick={() => {
                        if (isSecretKeyLocked === false) {
                            toast("Please lock your secret key");
                        }
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <i className="fas fa-edit" style={{ color: "#FFC107" }} />
                </button>
                <EditPasswordForm
                    secretKey={secretKey}
                    triggerDataRefetch={triggerDataRefetch}
                    index={index}
                />
                <button
                    className="delete"
                    title="Delete"
                    data-bs-toggle={isSecretKeyLocked ? "modal" : ""}
                    data-bs-target="#deleteNotification"
                    onClick={() => {
                        if (isSecretKeyLocked === false) {
                            toast("Please lock your secret key");
                        }
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <i className="fas fa-trash-alt" style={{ color: "red" }} />
                </button>
                <DeleteNotification
                    triggerDataRefetch={() => triggerDataRefetch()}
                    index={index}
                />
            </td>
        </tr>
    ));

function addHttps(link) {
    if (link == null) {
        return;
    }
    if (link.includes("https://") === true) {
        return link;
    }

    return "https://" + link;
}

export default PasswordsData;
