#include <math.h>
#include "encoder.hpp"
#include "constant.hpp"

using namespace std;

Encoder::Encoder(string userKey) {
    this->key = userKey;
}

// Main function to encrypt password with user-defiend key
string Encoder::encrypt(string password) {
    vector<int> maskedPassword = generateMaskedPassword(password);
    string encryptedPassword = convertPassword(maskedPassword);

    return encryptedPassword;
}

// Mask the original password with user-defined key
vector<int> Encoder::generateMaskedPassword(string password) {
    vector<int> maskedPassword;
    int passwordLen = password.length(), keyLen = this->key.length();

    for (int i = 0; i < passwordLen; i++) {
        int maskedCharacter = (int)password[i];

        // Only mask the password if secret key is not empty
        if (keyLen != 0) {
            int mask = (int)key[i % keyLen];
            maskedCharacter = (int)password[i] + mask;
        }

        maskedPassword.push_back(maskedCharacter);
    }

    return maskedPassword;
}

// Encrypt the masked password
string Encoder::convertPassword(vector<int> maskedPassword) {
    string convertedPassword;
    int passwordLen = maskedPassword.size();

    for (int i = 0; i < passwordLen; i++) {
        long convertedInteger = mathConverseFunction(maskedPassword[i]);
        char convertedCharacter = convertedInteger % (max_ascii_value - min_ascii_value) + min_ascii_value;
        
        // Integer value for decryption process
        string decryptionKey = to_string(convertedInteger / (max_ascii_value - min_ascii_value));

        convertedPassword += convertedCharacter + decryptionKey + " ";
    }
    // Pop the last space
    convertedPassword.pop_back();
    
    return convertedPassword;
}

// Invertible mathematical function mapping one character to another
// Ex: f(x) = x^3 + 5;
long Encoder::mathConverseFunction(int convertedIntegerValue) {
    return convertedIntegerValue * convertedIntegerValue * convertedIntegerValue + 5;
}