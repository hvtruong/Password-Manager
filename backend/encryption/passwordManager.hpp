#include <vector>

#include "encoder.hpp"
#include "decoder.hpp"
#include "constant.hpp"
#include <napi.h>

#ifndef PWMANAGER
#define PWMANAGER

using namespace std;

class PasswordManager : public Napi::ObjectWrap<PasswordManager> {
    private:
        Encoder encoder;
        Decoder decoder;

        vector<string> passwords;
        vector<string> hostSites;

    public:
        PasswordManager(string key);

        void insertSite(string site);
        void insertPassword(string password);

        string generateNewPassword();

        string decryptPassword(string encryptedPassword);

        void copyPasswordToClipboard(int index);

        void loadJson(string fileLocation);
        string exportToString();

        // Cmake-js functions to call from Nodejs
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        static Napi::Function GetClass(Napi::Env);
        PasswordManager(const Napi::CallbackInfo& info);

        void insertSiteWrapped(const Napi::CallbackInfo& info);
        void insertPasswordWrapped(const Napi::CallbackInfo& info);

        Napi::Value generateNewPasswordWrapped(const Napi::CallbackInfo&);

        Napi::String decryptPasswordWrapped(const Napi::CallbackInfo& info);

        Napi::Value exportToStringWrapped(const Napi::CallbackInfo&);
};

#endif