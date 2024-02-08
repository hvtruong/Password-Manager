#include <constant.hpp>

#ifndef DECODER
#define DECODER

using namespace std;

class Decoder {
    public:
        Decoder(string key);
        Decoder() = default;

        // Main function to decrypt password with user-defiend key
        string decrypt(string encodedPassword);

    private:
        string key;

        // Retrieve the result password of one-to-one function
        string retrieveEncodedPassword(string encodedPassword);

        // Decrypt to retrieve the masked password
        string invertPassword(string encodedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        char mathInverseFunction(int invertedInteger);

        // Unmask to retrieve the original password
        string unmaskPassword(string maskedPassword);
};

#endif