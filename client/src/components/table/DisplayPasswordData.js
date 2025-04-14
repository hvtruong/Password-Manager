import UpdatePasswordForm from "../forms/UpdatePasswordForm";
import JsonData from "./data.json";

function addHttps(link) {
    if (link == null) {
        return;
    }
    if (link.includes("https://") === true) {
        return link;
    }

    return "https://" + link;
}

function shortenPassword(password) {
    if (password == null) {
        return;
    }
    if (password.length <= 15) {
        return password;
    }

    return password.substring(0, 14) + "...";
}

const DisplayPasswordData = (passwords) => passwords.map((info) => (
    <tr key={info.id}>
        <td>
            <span className="cell-header">URL:</span>
            <a
                href={addHttps(info.website)}
                style={{ color: "#0d6efd", display: "table-cell" }}
                target="_blank"
                rel="noreferrer"
            >
                {info.website}
            </a>
        </td>
        <td>
            <span className="cell-header">Username:</span>
            {info.username}
        </td>
        <td>
            <span className="cell-header">Password:</span>
            {shortenPassword(info.password)}
        </td>
        <td>
            <span className="cell-header">Actions:</span>
            <a
                className="add"
                title="Copy password"
                data-toggle="tooltip"
                data-bs-toggle="modal"
                data-bs-target="#updateForm"
                href="/#"
            >
                <i className="fa-solid fa-copy" style={{ color: "#27C46B" }} />
            </a>
            <a
                className="edit"
                title="Edit"
                data-bs-toggle="modal"
                data-bs-target="#updatePasswordForm"
                href="/#"
            >
                <i className="fas fa-edit" style={{ color: "#FFC107" }} />
            </a>
            <UpdatePasswordForm />
        </td>
    </tr>
));

export default DisplayPasswordData;
