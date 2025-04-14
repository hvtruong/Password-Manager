#include "EncryptionWrapper.hpp"

using namespace std;
using namespace Napi;

// Cmake-js functions to call from Nodejs
Napi::Buffer<unsigned char> Encryption::encryptAES256GCMWrapper(const Napi::CallbackInfo&) {
    Napi::Env env = info.Env();

    Napi::String encryptedPassword = info[0].As<Napi::String>();
    Napi::String decryptedPassword = Napi::String::New(env, this->passwordManager.decryptPassword(encryptedPassword));

    return decryptedPassword;
}

Napi::String Encryption::decryptAES256GCMWrapper(const Napi::CallbackInfo&) {
    Napi::Env env = info.Env();

    Napi::String jsonFile = info[0].As<Napi::String>();
    this->passwordManager.loadPasswords(jsonFile);

    return;
}

Napi::Function Encryption::GetClass(Napi::Env env) {
  return DefineClass(
        env,
        "Encryption",
        {
            Encryption::InstanceMethod("encryptAES256GCM", &Encryption::encryptAES256GCMWrapper),
            Encryption::InstanceMethod("decryptAES256GCM", &Encryption::decryptAES256GCMWrapper)
        });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    Napi::String name = Napi::String::New(env, "Encryption");
    exports.Set(name, Encryption::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)