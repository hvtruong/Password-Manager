#include <math.h>
#include <iostream>
#include <sstream>
#include <vector>

#include "decoder.h"
#include "constant.h"

using namespace std;

Decoder::Decoder(string userKey) {
    this->key = userKey;
}

// Main function to decrypt password with user-defiend key
string Decoder::decrypt(string maskedPassword) {
    string invertedPassword = invertPassword(maskedPassword);
    string password = unmaskPassword(invertedPassword);

    return password;
}

// Function to retrieve the password blocks by splitting character
vector<string> split (string str, char delim) {
    vector<string> result;
    stringstream ss (str);
    string item;

    while (getline (ss, item, delim)) {
        result.push_back (item);
    }

    return result;
}

// Decrypt the masked password
string Decoder::invertPassword(string maskedPassword) {
    string invertedPassword;
    int passwordLen = maskedPassword.length();

    vector<string> unmaskedPasswordBlocks = split(maskedPassword, ' ');

    for (auto passwordBlock : unmaskedPasswordBlocks) {
        char maskedCharacter = passwordBlock[0];
        int decryptionKey = (int)(passwordBlock[1] - '0');
        
        int invertedInteger = maskedCharacter - min_ascii_value + decryptionKey * max_ascii_value;
        char invertedCharacter = mathInverseFunction(invertedInteger);

        invertedPassword += invertedCharacter;
    }

    return invertedPassword;
}

// One-to-one mathematical function mapping one character to another
// Ex: f(x) = x^3 + 5;
int Decoder::mathInverseFunction(char character) {
    int decimalValue = (int)character;
    return (int)cbrt(character - 5);
}

string Decoder::unmaskPassword(string maskedPassword) {
    string unmaskedPassword;
    int passwordLen = maskedPassword.length(), keyLen = key.length();

    for (int i = 0; i < passwordLen; i++) {
        char mask = key[i % keyLen];
        char unmaskedCharacter = maskedPassword[i] - mask;
        
        unmaskedPassword += unmaskedCharacter;
    }

    return unmaskedPassword;
}