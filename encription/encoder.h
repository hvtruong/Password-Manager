#include <string>

#ifndef ENCODER
#define ENCODER

using namespace std;

class Encoder {
    private:
        // Main function to encrypt password with user-defiend key
        string encrypt(string password, string key);

        // Mask the original password with user-defined key
        string generateMaskedPassword(string password, string key);

        // Encrypt the masked password
        string convertPassword(string maskedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        int mathConverseFunction(char character);
};

#endif