#include "passwordManager.hpp"
#include <time.h>
#include "../../lib/json.hpp"
#include <iostream>

using namespace std;
using json = nlohmann::json;

PasswordManager::PasswordManager() {
    this->encoder = Encoder("");
    this->decoder = Decoder("");
    srand(time(0));
}

PasswordManager::PasswordManager(string key) {
    this->encoder = Encoder(key);
    this->decoder = Decoder(key);
    srand(time(0));
}

string PasswordManager::decryptPassword(string encryptedPassword) {
    return decoder.decrypt(encryptedPassword);
}

void PasswordManager::insertSite(string site) {
    hostSites.push_back(site);

    return;
}

void PasswordManager::insertPassword(string password) {
    string encryptedPassword = encoder.encrypt(password);
    passwords.push_back(encryptedPassword);

    return;
}

vector<string> PasswordManager::retrieveHostSites() {
    return hostSites;
}

vector<string> PasswordManager::retrievePasswords() {
    return passwords;
}

char generateRandomCharacter() {
    return (char)(rand() % (max_ascii_value - min_ascii_value) + min_ascii_value);
}

string PasswordManager::generateNewPassword() {
    int randomLength = rand() % 30 + 15;
    string randomPassword;
    
    for (int i = 0; i < randomLength; i++) {
        char randomCharacter = generateRandomCharacter();
        randomPassword += randomCharacter;
    }

    return randomPassword;
}

string PasswordManager::exportToString() {
    nlohmann::ordered_json jsonFile;

    for (int i = 0; i < hostSites.size(); i++) {
        jsonFile.push_back({{"Website", hostSites[i]}, {"Password", passwords[i]}});
    }

    return to_string(jsonFile);
}