#include <string>

#ifndef DECODER
#define DECODER

using namespace std;

class Decoder {
    private:
        // Main function to decrypt password with user-defiend key
        string decrypt(string encodedPassword, string key);

        // Retrieve the result password of one-to-one function
        string retrieveEncodedPassword(string encodedPassword);

        // Decrypt to retrieve the masked password
        string invertPassword(string encodedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        int mathInverseFunction(char character);

        // Unmask to retrieve the original password
        string unmaskPassword(string maskedPassword);
};

#endif