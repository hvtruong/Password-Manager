import NewPasswordForm from "./NewPasswordForm";
import { ConditionalModalButton, ActionButton } from "components/Buttons";
import { csvMaker, download } from "utils/export";
import { toast } from "react-toastify";

const TableButtons = ({
    secretKey,
    isSecretKeyLocked,
    setShouldDataRefetch,
    passwords,
}) => (
    <>
        <AddNewPasswordButton isSecretKeyLocked={isSecretKeyLocked} />
        <NewPasswordForm
            secretKey={secretKey}
            triggerDataRefetch={() => setShouldDataRefetch(true)}
        />
        <ExportButton passwords={passwords} />
    </>
);

const AddNewPasswordButton = ({ isSecretKeyLocked }) => (
    <ConditionalModalButton
        buttonText="Add New Password"
        formId="newPasswordForm"
        isSecretKeyLocked={isSecretKeyLocked}
        onClick={() => {
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
            const data = csvMaker(passwords);
            download(data);
        }}
    />
);

export default TableButtons;
