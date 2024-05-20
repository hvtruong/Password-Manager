#include <string>

#ifndef DECODER
#define DECODER

using namespace std;

class Decoder {
    public:
        Decoder(string key);
        Decoder() = default;

        // Main function to decrypt password with user-defiend key
        string decrypt(string encryptedPassword);

    private:
        string key;

        // Decrypt to retrieve the masked password
        vector<int> invertPassword(string encryptedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        int mathInverseFunction(long invertedInteger);

        // Unmask to retrieve the original password
        string unmaskPassword(vector<int> maskedPassword);
};

#endif