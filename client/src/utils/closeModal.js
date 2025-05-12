import $ from "jquery";

const closeModal = () => {
    const button = $("#closeButton");
    button.trigger("click");
};

export default closeModal;
