import {
    UsernameInputField,
    PasswordInputField,
    EmailInputField,
    WebsiteInputField,
    NewPasswordInputField,
} from "../input/InputField";
import $ from "jquery";
import styles from "./Modal.module.css";

const Modal = ({
    modalId,
    title,
    handleSubmit,
    formData,
    setFormData,
    errMsg,
    extraComponent,
}) => (
    <div
        className="modal fade"
        id={modalId}
        tabIndex={-1}
        aria-labelledby={`${modalId}-label`}
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className={`modal-content ${styles.box}`}>
                <form
                    className="needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <ModalHeader
                        title={title}
                        closeModalButtonId={`${modalId}-close`}
                    />
                    <ModalBody
                        formData={formData}
                        setFormData={setFormData}
                        errMsg={errMsg}
                        extraComponent={extraComponent}
                    />
                    <ModalFooter />
                </form>
            </div>
        </div>
    </div>
);

const ModalHeader = ({ title, closeModalButtonId }) => (
    <div className="modal-header">
        <h1
            className="modal-title fs-5 w-100 text-center"
            id={closeModalButtonId + "-label"}
        >
            {title}
        </h1>
        <button
            type="button"
            id={closeModalButtonId}
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
        />
    </div>
);

const ModalBody = ({ formData, setFormData, errMsg, extraComponent }) => (
    <div className="modal-body">
        <p className="text-white mb-3">Please fill in the fields below!</p>
        {inputFields.map(
            ({ key, Component, prop }) =>
                key in formData && (
                    <Component
                        key={key}
                        {...{ [prop]: formData[key], setFormData }}
                    />
                )
        )}

        {extraComponent}

        {errMsg && (
            <p
                className="mt-2"
                style={{ color: "#ff0000" }}
                aria-live="assertive"
            >
                {errMsg}
            </p>
        )}
    </div>
);

const ModalFooter = () => (
    <div className="modal-footer">
        <button type="submit" className="btn btn-primary w-100">
            Submit
        </button>
    </div>
);

const inputFields = [
    { key: "username", Component: UsernameInputField, prop: "username" },
    { key: "password", Component: PasswordInputField, prop: "password" },
    { key: "emailAddress", Component: EmailInputField, prop: "emailAddress" },
    { key: "website", Component: WebsiteInputField, prop: "website" },
    { key: "newPassword", Component: NewPasswordInputField, prop: "newPassword" },
];

const closeModal = (id) => {
    const button = $(id);
    button.trigger("click");
};

export { closeModal };
export default Modal;