#include <constant.hpp>

#ifndef ENCODER
#define ENCODER

using namespace std;

class Encoder {
    public:
        Encoder(string key);
        Encoder() = default;

        // Main function to encrypt password with user-defiend key
        string encrypt(string password);
        
    private:
        string key;

        // Mask the original password with user-defined key
        string generateMaskedPassword(string password);

        // Encrypt the masked password
        string convertPassword(string maskedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        int mathConverseFunction(char character);
};

#endif