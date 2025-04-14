#ifndef ENCRYPTION_HPP
#define ENCRYPTION_HPP

#include <string>
#include <vector>

class Encryption {
public:
    // Encrypts the given plaintext using the provided key
    static std::string encryptAES256GCM(const std::string& plaintext, std::vector<unsigned char>& ciphertext, std::vector<unsigned char>& iv, const unsigned char* key, std::vector<unsigned char>& tag);

    // Decrypts the given ciphertext using the provided key
    static std::string decrypt(const std::vector<unsigned char>& ciphertext, const std::string& key);

    // Generates a random encryption key
    static std::string generateKey();

private:
    // Helper function to perform padding on the plaintext
    static std::string pad(const std::string& plaintext);

    // Helper function to remove padding from the decrypted text
    static std::string unpad(const std::string& decryptedText);
};

#endif // ENCRYPTION_HPP