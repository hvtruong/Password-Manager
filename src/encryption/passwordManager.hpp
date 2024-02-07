#include "encoder.hpp"
#include "decoder.hpp"

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
        string decryptPassword(string encryptedPassword);

        void insertSite(string site);
        void insertPassword(string password);

        void copyPasswordToClipboard(int index);

        void generateNewPassword();

        void loadTxt(string fileLocation);
        void exportToTxt(string fileLocation);
};

#endif