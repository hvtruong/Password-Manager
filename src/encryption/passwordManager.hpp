#include <vector>

#include "encoder.hpp"
#include "decoder.hpp"
#include "constant.hpp"

#ifndef PWMANAGER
#define PWMANAGER

using namespace std;

class PasswordManager {
    private:
        Encoder encoder;
        Decoder decoder;

        vector<string> passwords;
        vector<string> hostSites;

    public:
        PasswordManager(string key);

        vector<string> retrieveHostSites();
        vector<string> retrievePasswords();

        void insertSite(string site);
        void insertPassword(string password);
        
        string generateNewPassword();

        string decryptPassword(string encryptedPassword);

        void copyPasswordToClipboard(int index);

        void loadTxt(string fileLocation);
        void exportToTxt(string fileLocation);
};

#endif