#include <openssl/evp.h>
#include <openssl/rand.h>
#include <openssl/err.h>
#include <iostream>
#include <vector>

std::string encryptAES256GCM(const std::string& plaintext, std::vector<unsigned char>& iv, const unsigned char* key, std::vector<unsigned char>& tag) {
    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();

    iv.resize(12);
    RAND_bytes(iv.data(), iv.size());

    EVP_EncryptInit_ex(ctx, EVP_aes_256_gcm(), NULL, key, iv.data());

    std::vector<unsigned char> ciphertext;
    ciphertext.resize(plaintext.size());
    int len;
    EVP_EncryptUpdate(ctx, ciphertext.data(), &len, (unsigned char*)plaintext.c_str(), plaintext.size());

    EVP_EncryptFinal_ex(ctx, ciphertext.data() + len, &len);
    
    tag.resize(16);
    EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_GET_TAG, 16, tag.data());

    EVP_CIPHER_CTX_free(ctx);

    return std::string(ciphertext.begin(), ciphertext.end());
}

std::string decryptAES256GCM(const std::string& ciphertext, const std::vector<unsigned char>& iv, const unsigned char* key, const std::vector<unsigned char>& tag) {
    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();

    EVP_DecryptInit_ex(ctx, EVP_aes_256_gcm(), NULL, key, iv.data());

    std::vector<unsigned char> decryptedText(ciphertext.size());
    int len;
    EVP_DecryptUpdate(ctx, decryptedText.data(), &len, (const unsigned char*)ciphertext.data(), ciphertext.size());

    EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_SET_TAG, 16, (void*)tag.data());

    if (EVP_DecryptFinal_ex(ctx, decryptedText.data() + len, &len) <= 0) {
        std::cerr << "Decryption failed!" << std::endl;
        EVP_CIPHER_CTX_free(ctx);
        return {};
    }

    std::string plaintext;
    plaintext.assign(decryptedText.begin(), decryptedText.end());
    EVP_CIPHER_CTX_free(ctx);

    return plaintext;
}

int main() {
    std::string plaintext = "Hello, world!";
    unsigned char key[32];
    RAND_bytes(key, sizeof(key));
    std::vector<unsigned char> iv, tag;
    std::string ciphertext = encryptAES256GCM(plaintext, iv, key, tag);
    std::cout << "Ciphertext: "<< ciphertext << std::endl;
    std::cout << "Encryption successful!" << std::endl;

    std::string decryptedText = decryptAES256GCM(ciphertext, iv, key, tag);
    std::cout << "Decrypted text: " << decryptedText << std::endl;
    return 0;
}
// https://wiki.openssl.org/index.php/EVP_Symmetric_Encryption_and_Decryption