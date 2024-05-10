#include "passwordManager.hpp"
#include <fstream>
#include <cstdlib>
#include <time.h>
#include "../../lib/json.hpp"
#include <iostream>
#include <iomanip>

using namespace std;
using namespace Napi;
using json = nlohmann::json;

// Default constructor
// PasswordManager::PasswordManager(string key) {
//     encoder = Encoder(key);
//     decoder = Decoder(key);
//     srand(time(0));
// }

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

string PasswordManager::exportToString() {
    nlohmann::ordered_json jsonFile;

    for (int i = 0; i < hostSites.size(); i++) {
        jsonFile.push_back({{"Website", hostSites[i]}, {"Password", passwords[i]}});
    }

    return to_string(jsonFile);
}

// Cmake-js functions to call from Nodejs
PasswordManager::PasswordManager(const Napi::CallbackInfo& info) 
    : ObjectWrap(info) {
        Napi::Env env = info.Env();
        
    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
        return;
    }
            
    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Please provide a secret key")
        .ThrowAsJavaScriptException();
        return;
    }
            
    string key = info[0].As<Napi::String>().Utf8Value();
    
    this->encoder = Encoder(key);
    this->decoder = Decoder(key);
    srand(time(0));
}

void PasswordManager::insertSiteWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    string newSite = info[0].As<Napi::String>().Utf8Value();
    insertSite(newSite);

    return;
}
void PasswordManager::insertPasswordWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    string newPassword = info[0].As<Napi::String>().Utf8Value();
    insertPassword(newPassword);

    return;
}

Napi::Value PasswordManager::generateNewPasswordWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  return Napi::String::New(env, generateNewPassword());
}


Napi::String PasswordManager::decryptPasswordWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    Napi::String encryptedPassword = info[0].As<Napi::String>();
    Napi::String decryptedPassword = Napi::String::New(env, decryptPassword(encryptedPassword));
    
    return decryptedPassword;
}

Napi::Value PasswordManager::exportToStringWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    string jsonFormattedString = exportToString();
    
    return Napi::String::New(env, jsonFormattedString);;
}

Napi::Function PasswordManager::GetClass(Napi::Env env) {
  return DefineClass(
      env,
      "PasswordManager",
      {
          PasswordManager::InstanceMethod("generateNewPassword", &PasswordManager::generateNewPasswordWrapped),
          PasswordManager::InstanceMethod("insertPassword", &PasswordManager::insertPasswordWrapped),
          PasswordManager::InstanceMethod("insertSite", &PasswordManager::insertSiteWrapped),
          PasswordManager::InstanceMethod("exportToString", &PasswordManager::exportToStringWrapped),
      });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Napi::String name = Napi::String::New(env, "PasswordManager");
  exports.Set(name, PasswordManager::GetClass(env));
  return exports;
}

NODE_API_MODULE(addon, Init)