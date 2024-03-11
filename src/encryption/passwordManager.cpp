#include "passwordManager.hpp"
#include <fstream>
#include <cstdlib>
#include <time.h>

using namespace std;

PasswordManager::PasswordManager(string key) {
    encoder = Encoder(key);
    decoder = Decoder(key);
    srand(time(0));
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

void PasswordManager::exportToTxt(string fileLocation) {
    ofstream outputFile(fileLocation);

    for (int i = 0; i < hostSites.size(); i++) {
        outputFile << hostSites[i] << " " << passwords[i] << "\n";
    }

    outputFile.close();

    return;
}