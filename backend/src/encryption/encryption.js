const crypto = require("crypto");

/**
 * Encrypts a password using AES-256-CBC encryption algorithm.
 *
 * @param {string} plaintextPassword - The plaintext password to be encrypted.
 * @param {string} secretKey - The secret key used for encryption, represented as a hexadecimal string.
 * @returns {string} The encrypted password in the format "iv:encryptedData", where `iv` is the initialization vector in hexadecimal format.
 */
const encryptPassword = (plaintextPassword, secretKey) => {
    const initializationVector = crypto.randomBytes(16);

    // Hash the secret key to ensure it is 32-bytes length as required by AES-256
    const hashedKey = crypto.createHash("sha256").update(secretKey).digest();

    // Create the cipher using AES-256-CBC
    const cipher = crypto.createCipheriv("aes-256-cbc", hashedKey, initializationVector);

    let encryptedData = cipher.update(plaintextPassword, "utf8", "hex");
    encryptedData += cipher.final("hex");

    // Return the IV and encrypted data as a single string
    return `${initializationVector.toString("hex")}:${encryptedData}`;
};

/**
 * Decrypts an encrypted password using AES-256-CBC algorithm and a secret key.
 * If no secret key is provided, the function returns the encrypted password as is.
 *
 * @param {string} encryptedPassword - The encrypted password in the format "IV:encryptedData".
 * @param {string} secretKey - The secret key used for decryption. Must be provided to decrypt the password.
 * @returns {string} The decrypted password if the secret key is provided, otherwise the original encrypted password.
 */
const decryptPassword = (encryptedPassword, secretKey) => {
    if (!secretKey) {
        return encryptedPassword;
    }
    // Split the encrypted password into IV and encrypted data
    const [ivHex, encryptedData] = encryptedPassword.split(":");

    const initializationVector = Buffer.from(ivHex, "hex");

    // Hash the secret key to ensure it is 32-bytes length as required by AES-256
    const hashedKey = crypto.createHash("sha256").update(secretKey).digest();

    const decipher = crypto.createDecipheriv("aes-256-cbc", hashedKey, initializationVector);

    let decryptedData = decipher.update(encryptedData, "hex", "utf8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
};

module.exports = {
    encryptPassword,
    decryptPassword,
};