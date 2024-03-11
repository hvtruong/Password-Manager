#include <string>
#include <vector>

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
        vector<int> generateMaskedPassword(string password);

        // Encrypt the masked password
        string convertPassword(vector<int> maskedPassword);

        // One-to-one mathematical function mapping one character to another
        // Ex: f(x) = x^3 + 5;
        long mathConverseFunction(int convertedIntegerValue);
};

#endif