import $ from "jquery";

const closeModal = (id) => {
    const button = $(id);
    button.trigger("click");
};

export default closeModal;
