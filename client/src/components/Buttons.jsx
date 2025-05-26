import { Button } from "react-bootstrap";

// ModalButton: Opens a modal with the given formId when clicked
const ModalButton = ({
    buttonText,
    formId,
    variant = "primary",
    className = "btn btn-primary",
}) => (
    <CustomButton
        buttonText={buttonText}
        variant={variant}
        className={className}
        data-bs-toggle="modal"
        data-bs-target={`#${formId}`}
    />
);

// ConditionalModalButton: Opens a modal only if isSecretKeyLocked is true
const ConditionalModalButton = ({
    buttonText,
    formId,
    className = "btn btn-primary",
    variant = "primary",
    onClick,
    isSecretKeyLocked,
}) => (
    <CustomButton
        buttonText={buttonText}
        variant={variant}
        className={className}
        data-bs-toggle={isSecretKeyLocked ? "modal" : undefined}
        data-bs-target={`#${formId}`}
        onClick={onClick}
    />
);

// ActionButton: Generic action button
const ActionButton = ({
    buttonText,
    variant = "secondary",
    className = "btn btn-secondary",
    onClick,
}) => (
    <CustomButton
        buttonText={buttonText}
        variant={variant}
        className={className}
        onClick={onClick}
    />
);

// Generic Button component for reuse
const CustomButton = ({
    buttonText,
    variant = "primary",
    className = "",
    onClick,
    ...rest
}) => (
    <Button variant={variant} className={className} onClick={onClick} {...rest}>
        {buttonText}
    </Button>
);

export { ModalButton, ConditionalModalButton, ActionButton };
