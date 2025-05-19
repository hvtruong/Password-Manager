import { Button } from "react-bootstrap";
import NewPasswordForm from "./NewPasswordForm";
import { csvMaker, download } from "utils/export";
import { toast } from "react-toastify";

const TableButtons = ({
    secretKey,
    isSecretKeyLocked,
    setDataRefetch,
    passwords,
}) => (
    <>
        <AddNewPasswordButton
            secretKey={secretKey}
            isSecretKeyLocked={isSecretKeyLocked}
            setDataRefetch={setDataRefetch}
        />
        <ExportButton passwords={passwords} />
    </>
);

const AddNewPasswordButton = ({ secretKey, isSecretKeyLocked, setDataRefetch }) => (
    <>
        <Button
            variant="primary"
            className="btn btn-primary"
            data-bs-toggle={isSecretKeyLocked ? "modal" : ""}
            data-bs-target="#newPasswordForm"
            onClick={() => {
                if (isSecretKeyLocked) {
                    return;
                }
                toast("Please lock your secret key");
            }}
        >
            Add New Password
        </Button>
        <NewPasswordForm secretKey={secretKey} setDataRefetch={setDataRefetch} />
    </>
);

const ExportButton = ({ passwords }) => (
    <>
        <Button
            variant="secondary"
            className="btn btn-secondary"
            onClick={() => {
                csvMaker(passwords);
                download("passwords.csv");
            }}
        >
            Export
        </Button>
    </>
);

export default TableButtons;
