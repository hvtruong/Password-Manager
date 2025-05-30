import $ from "jquery";
import styles from "./Modal.module.css";
import {
    UsernameInputField,
    PasswordInputField,
    EmailInputField,
    WebsiteInputField,
    RepeatPasswordInputField,
} from "../InputField";

const Modal = ({
    modalId,
    title,
    handleSubmit,
    formData,
    setFormData,
    required=true,
    type,
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
        <div className="modal-dialog modal-content">
            <form className="needs-validation" onSubmit={handleSubmit}>
                <div className={`${styles.box}`}>
                    <ModalHeader
                        title={title}
                        closeModalButtonId={`${modalId}-close`}
                    />
                    <ModalBody
                        formData={formData}
                        setFormData={setFormData}
                        required={required}
                        errMsg={errMsg}
                        extraComponent={extraComponent}
                        type={type}
                    />
                    <ModalFooter />
                </div>
            </form>
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

const ModalBody = ({ formData, setFormData, required=true, errMsg, extraComponent, type }) => (
    <div className="modal-body">
        <p className="text-white mb-3">Please fill in the fields below!</p>
        {inputFields.map(
            ({ key, Component, prop }) =>
                key in formData && (
                    <Component
                        key={key}
                        {...{ [prop]: formData[key], setFormData, required, type }}
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
        <input type="submit" name="" value="Submit" />
    </div>
);

const inputFields = [
    { key: "emailAddress", Component: EmailInputField, prop: "emailAddress" },
    { key: "website", Component: WebsiteInputField, prop: "website" },
    { key: "username", Component: UsernameInputField, prop: "username" },
    { key: "password", Component: PasswordInputField, prop: "password" },
    {
        key: "repeatPassword",
        Component: RepeatPasswordInputField,
        prop: "repeatPassword",
    },
];

const closeModal = (id) => {
    const button = $(id);
    button.trigger("click");
};

export { closeModal };
export default Modal;
