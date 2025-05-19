const SecretKeyInput = ({
    type = "text",
    secretKey = "",
    onChange,
    onToggle,
    lock = false,
}) => (
    <div className="filter-group">
        <label htmlFor="secretKey">Secret Key</label>
        <input
            type={type}
            className="form-control"
            name="secretKey"
            id="secretKey"
            placeholder="Enter your secret key"
            required
            value={secretKey}
            onChange={onChange}
            disabled={type === "password"}
        />
        <button
            type="button"
            onClick={onToggle}
            aria-label={lock ? "Lock secret key" : "Unlock secret key"}
            style={{
                marginLeft: "7px",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
            }}
            id="lock"
        >
            <i
                className={lock ? "fas fa-lock fa-fw" : "fas fa-unlock fa-fw"}
            ></i>
        </button>
    </div>
);

export default SecretKeyInput;
