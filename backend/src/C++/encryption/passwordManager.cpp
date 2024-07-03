#include "passwordManager.hpp"
#include <time.h>
#include <iostream>
#include <regex>
#include <string>

using namespace std;
using json = nlohmann::ordered_json;

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

void PasswordManager::insertNewData(string website, string password) {
    string encryptedPassword = encoder.encrypt(password);
    passwordsData.push_back({{"Website", website}, {"Password", encryptedPassword}});

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

void PasswordManager::loadPasswords(string jsonString) {
    string pattern = "&quot;";
  
    // regex object 
    regex reg(pattern); 
  
    // replacement string 
    string replacement = "\""; 
  
    // call regex_replace() and store the result 
    string result = regex_replace(jsonString, reg, replacement);

    this->passwordsData = json::parse(result);

    return;
}

string PasswordManager::exportToString() {

    return to_string(passwordsData);
}