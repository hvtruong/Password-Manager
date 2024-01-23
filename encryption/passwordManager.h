#include "encoder.h"
#include "decoder.h"
#include <vector>

#ifndef PWMANAGER
#define PWMANAGER

using namespace std;

class PasswordManager {
    public:
        PasswordManager(string key);
    private:
        Encoder encoder;
        Decoder decoder;

        void loadTxt(string fileLocation);
        vector<string> retrieveHostSites();
        vector<string> retrievePasswords();
        void exportToTxt(string fileLocation);

        void copyPasswordToClipboard(int index);

        void generateNewPassword();
};

#endif