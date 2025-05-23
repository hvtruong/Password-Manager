import NewPasswordForm from "./NewPasswordForm";
import {
    ConditionalModalButton,
    ActionButton,
} from "components/button/Buttons";
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
        <NewPasswordForm
            secretKey={secretKey}
            setDataRefetch={setDataRefetch}
        />
        <ExportButton passwords={passwords} />
    </>
);

const AddNewPasswordButton = ({ isSecretKeyLocked }) => (
    <ConditionalModalButton
        buttonText="Add New Password"
        formId="newPasswordForm"
        isSecretKeyLocked={isSecretKeyLocked}
        handleClick={() => {
            if (isSecretKeyLocked) {
                return;
            }
            toast("Please lock your secret key");
        }}
    />
);

const ExportButton = ({ passwords }) => (
    <ActionButton
        buttonText={"Export"}
        onClick={() => {
            csvMaker(passwords);
            download("passwords.csv");
        }}
    />
);

export default TableButtons;
