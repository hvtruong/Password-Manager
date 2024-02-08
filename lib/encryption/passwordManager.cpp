#include "passwordManager.hpp"
#include <fstream>

using namespace std;

PasswordManager::PasswordManager(string key) {
    encoder = Encoder(key);
    decoder = Decoder(key);
}

vector<string> PasswordManager::retrieveHostSites() {
    return hostSites;
}

vector<string> PasswordManager::retrievePasswords() {
    return passwords;
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

void PasswordManager::exportToTxt(string fileLocation) {
    ofstream outputFile(fileLocation);

    for (int i = 0; i < hostSites.size(); i++) {
        outputFile << hostSites[i] << " " << passwords[i] << "\n";
    }

    outputFile.close();

    return;
}