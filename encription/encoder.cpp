#include <math.h>

#include "encoder.h"
#include "constant.h"

using namespace std;

Encoder::Encoder() = default;

// Main function to encrypt password with user-defiend key
string Encoder::encrypt(string password, string key) {
    string maskedPassword = generateMaskedPassword(password, key);
    string encryptedPassword = convertPassword(maskedPassword);

    return encryptedPassword;
}

// Mask the original password with user-defined key
string Encoder::generateMaskedPassword(string password, string key) {
    string maskedPassword;
    int passwordLen = password.length(), keyLen = key.length();

    for (int i = 0; i < passwordLen; i++) {
        char mask = key[i % keyLen];
        char maskedCharacter = password[i] + mask;
        
        maskedPassword += maskedCharacter;
    }

    return maskedPassword;
}

// Encrypt the masked password
string Encoder::convertPassword(string maskedPassword) {
    string convertedString;
    int passwordLen = maskedPassword.length();

    for (int i = 0; i < passwordLen - 1; i++) {
        char maskedCharacter = maskedPassword[i];
        int convertedInteger = mathConverseFunction(maskedCharacter);
        char convertedCharacter = convertedInteger % max_ascii_value + min_ascii_value;
        
        // Integer value for decryption process
        string decryptionKey = to_string(convertedCharacter / max_ascii_value);

        convertedString += convertedCharacter + decryptionKey + " ";
    }

    return convertedString;
}

// One-to-one mathematical function mapping one character to another
// Ex: f(x) = x^3 + 5;
int Encoder::mathConverseFunction(char character) {
    int decimalValue = (int)character;
    return decimalValue * decimalValue * decimalValue + 5;
}