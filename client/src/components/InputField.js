const UsernameInputField = ({ username, setFormData }) => (
    <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleInputChange.bind(null, setFormData)}
        required
    />
);

const PasswordInputField = ({ password, setFormData }) => (
    <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange.bind(null, setFormData)}
        required
    />
);

const EmailInputField = ({ emailAddress, setFormData }) => (
    <input
        type="text"
        name="emailAddress"
        placeholder="Email Address"
        value={emailAddress}
        onChange={handleInputChange.bind(null, setFormData)}
        required
    />
);

const WebsiteInputField = ({ website, setFormData }) => (
    <input
        type="text"
        name="website"
        placeholder="Website"
        value={website}
        onChange={handleInputChange.bind(null, setFormData)}
        required
    />
);

const RepeatPasswordInputField = ({ repeatPassword, setFormData }) => (
    <input
        type="password"
        name="repeatPassword"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={handleInputChange.bind(null, setFormData)}
        required
    />
);

const handleInputChange = (setFormData, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

export {
    UsernameInputField,
    PasswordInputField,
    EmailInputField,
    WebsiteInputField,
    RepeatPasswordInputField,
};
