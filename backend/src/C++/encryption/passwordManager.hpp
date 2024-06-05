#include <vector>
#include "../lib/json.hpp"

#include "encoder.hpp"
#include "decoder.hpp"
#include "constant.hpp"

#ifndef PWMANAGER
#define PWMANAGER

using namespace std;
using json = nlohmann::ordered_json;

class PasswordManager {
    private:
        Encoder encoder;
        Decoder decoder;

        json passwordsData;

    public:
        PasswordManager();
        PasswordManager(string key);

        void insertNewData(string website, string password);

        string generateNewPassword();

        string decryptPassword(string encryptedPassword);

        void loadPasswords(string jsonPasswords);
        string exportToString();
};

#endif