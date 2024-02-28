#include <math.h>
#include <sstream>
#include <vector>

#include "decoder.hpp"
#include "constant.hpp"

using namespace std;

Decoder::Decoder(string userKey) {
    key = userKey;
}

// Main function to decrypt password with user-defiend key
string Decoder::decrypt(string encryptedPassword) {
    vector<int> invertedPassword = invertPassword(encryptedPassword);
    string password = unmaskPassword(invertedPassword);

    return password;
}

// Function to retrieve the password blocks by splitting character
vector<string> split(string str, char delim) {
    vector<string> result;
    stringstream ss (str);
    string item;

    while (getline (ss, item, delim)) {
        result.push_back(item);
    }

    return result;
}

// Decrypt the masked password
vector<int> Decoder::invertPassword(string encryptedPassword) {
    vector<int> invertedPassword;
    int passwordLen = encryptedPassword.length();

    vector<string> unmaskedPasswordBlocks = split(encryptedPassword, ' ');

    for (auto passwordBlock : unmaskedPasswordBlocks) {
        char maskedCharacter = passwordBlock[0];
        int decryptionKey = stoi(passwordBlock.substr(1));
        
        long invertedInteger = (int)maskedCharacter - min_ascii_value + decryptionKey * (max_ascii_value - min_ascii_value);
        int invertedCharacter = mathInverseFunction(invertedInteger);

        invertedPassword.push_back(invertedCharacter);
    }

    return invertedPassword;
}

// One-to-one mathematical function mapping one character to another
// Ex: f(x) = x^3 + 5;
int Decoder::mathInverseFunction(long invertedInteger) {
    return (int)(cbrt(invertedInteger - 5) + 0.5);
}

string Decoder::unmaskPassword(vector<int> maskedPassword) {
    string unmaskedPassword;
    int passwordLen = maskedPassword.size(), keyLen = key.length();

    for (int i = 0; i < passwordLen; i++) {
        int mask = key[i % keyLen];
        char unmaskedCharacter = maskedPassword[i] - mask;
        
        unmaskedPassword += unmaskedCharacter;
    }

    return unmaskedPassword;
}