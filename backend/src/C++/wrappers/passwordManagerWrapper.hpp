#include "../encryption/passwordManager.hpp"
#include <napi.h>

#ifndef PWMANAGERWRAPPER
#define PWMANAGERWRAPPER

using namespace std;

class PasswordManagerWrapper : public Napi::ObjectWrap<PasswordManagerWrapper> {
    private:
        PasswordManager passwordManager;

    public:
        PasswordManagerWrapper(const Napi::CallbackInfo&);
        
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
        static Napi::Function GetClass(Napi::Env);

        void insertDataWrapped(const Napi::CallbackInfo&);

        Napi::Value generateNewPasswordWrapped(const Napi::CallbackInfo&);

        Napi::String decryptPasswordWrapped(const Napi::CallbackInfo&);

        void loadPasswordsWrapped(const Napi::CallbackInfo&);
        Napi::Value exportToStringWrapped(const Napi::CallbackInfo&);
};

#endif