#include <string>

#ifndef ENCODER
#define ENCODER

using namespace std;

class Encoder {
    public:
        Encoder(string key);
    private:
        string key;

        // Main function to encrypt password with user-defiend key
        string encrypt(string password);

        // Mask the original password with user-defined key
        string generateMaskedPassword(string password);

        // Encrypt the masked password
        string convertPassword(string maskedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        int mathConverseFunction(char character);
};

#endif