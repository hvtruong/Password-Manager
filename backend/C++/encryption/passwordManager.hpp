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
        PasswordManager();
        PasswordManager(string key);

        void insertSite(string site);
        void insertPassword(string password);

        vector<string> retrieveHostSites();
        vector<string> retrievePasswords();

        string generateNewPassword();

        string decryptPassword(string encryptedPassword);

        void loadPasswords(string jsonPasswords);
        string exportToString();
};

#endif