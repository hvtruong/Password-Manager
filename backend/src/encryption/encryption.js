const crypto = require("crypto");

/**
 * Encrypts a password using AES-256-CBC encryption algorithm.
 *
 * @param {string} password - The plaintext password to be encrypted.
 * @param {string} secretKey - The secret key used for encryption, represented as a hexadecimal string.
 * @returns {string} The encrypted password in the format "iv:encryptedData", where `iv` is the initialization vector in hexadecimal format.
 */
const encryptPassword = (password, secretKey) => {
    const iv = crypto.randomBytes(16);
    console.log("IV: ", iv);
    const hashedKey = crypto.createHash("sha256").update(secretKey.secretKey).digest();
    console.log("Hashed Key: ", hashedKey);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(hashedKey, "hex"), iv);
    console.log("HERE")
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    console.log("Encrypted: ", encrypted);
    return iv.toString("hex") + ":" + encrypted;
};

/**
 * Decrypts an encrypted password using AES-256-CBC encryption algorithm.
 *
 * @param {string} encryptedPassword - The encrypted password in the format "iv:encryptedData",
 *                                      where `iv` is the initialization vector in hexadecimal format.
 * @param {string} secretKey - The secret key used for decryption, represented as a hexadecimal string.
 * @returns {string} The decrypted password in plain text
 */
const decryptPassword = (encryptedPassword, secretKey) => {
    const [ivHex, encrypted] = encryptedPassword.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secretKey, "hex"), iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

module.exports = {
    encryptPassword,
    decryptPassword,
};