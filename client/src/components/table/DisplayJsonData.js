import JsonData from './data.json'
import Update from "../forms/UpdateForm";

function addHttps(link) {
    if (link.includes("https://") === true) {
        return link
    }

    return "https://" + link
}

function shortenPassword(password) {
    if (password.length <= 15) {
        return password
    }

    return password.substring(0, 14) + "..."
}

const DisplayJsonData = JsonData.map(
    (info) => {
        return (
            <tr key = {info.id}>
                <td>
                    <span className='cell-header'>
                        ID: 
                    </span>
                    {info.id}
                </td>
                <td>
                    <span className='cell-header'>
                        Website: 
                    </span>
                    <a href={addHttps(info.website)} style={{color: "#0d6efd", display: "table-cell"}} target="_blank">
                        {info.website}
                    </a>
                </td>
                <td>
                    <span className='cell-header'>
                        Username: 
                    </span>
                    {info.username}
                </td>
                <td>
                    <span className='cell-header'>
                        Password: 
                    </span>
                    {shortenPassword(info.password)}
                </td>
                <td>
                    <span className='cell-header'>
                        Actions: 
                    </span>
                    <a class="add" title="Copy password" data-toggle="tooltip" data-bs-toggle="modal" data-bs-target="#updateForm">
                        <i className="fa-solid fa-copy" style={{color: "#27C46B"}}></i>
                    </a>
                    <Update />
                    <a class="edit" title="Edit" data-toggle="tooltip"><i className="fas fa-edit" style={{color: "#FFC107"}}></i></a>
                </td>
            </tr>
        )
    }
)

export default DisplayJsonData