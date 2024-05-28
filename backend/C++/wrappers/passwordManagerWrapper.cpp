#include "passwordManagerWrapper.hpp"

using namespace std;
using namespace Napi;

// Cmake-js functions to call from Nodejs
PasswordManagerWrapper::PasswordManagerWrapper(const Napi::CallbackInfo& info) 
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
}

void PasswordManagerWrapper::insertSiteWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    string newSite = info[0].As<Napi::String>().Utf8Value();
    this->passwordManager.insertSite(newSite);

    return;
}

void PasswordManagerWrapper::insertPasswordWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    string newPassword = info[0].As<Napi::String>().Utf8Value();
    this->passwordManager.insertPassword(newPassword);

    return;
}

Napi::Value PasswordManagerWrapper::generateNewPasswordWrapped(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  return Napi::String::New(env, this->passwordManager.generateNewPassword());
}

Napi::String PasswordManagerWrapper::decryptPasswordWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    Napi::String encryptedPassword = info[0].As<Napi::String>();
    Napi::String decryptedPassword = Napi::String::New(env, this->passwordManager.decryptPassword(encryptedPassword));
    
    return decryptedPassword;
}

void loadPasswordsWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    Napi::String jsonFile = info[0].As<Napi::String>();
    this->passwordManager.loadPasswords(jsonFile);

    return;
}

Napi::Value PasswordManagerWrapper::exportToStringWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    string jsonFormattedString = this->passwordManager.exportToString();
    
    return Napi::String::New(env, jsonFormattedString);;
}

Napi::Function PasswordManagerWrapper::GetClass(Napi::Env env) {
  return DefineClass(
      env,
      "PasswordManagerWrapper",
      {
          PasswordManagerWrapper::InstanceMethod("generateNewPassword", &PasswordManagerWrapper::generateNewPasswordWrapped),
          PasswordManagerWrapper::InstanceMethod("insertPassword", &PasswordManagerWrapper::insertPasswordWrapped),
          PasswordManagerWrapper::InstanceMethod("insertSite", &PasswordManagerWrapper::insertSiteWrapped),
          PasswordManagerWrapper::InstanceMethod("loadPasswords", &PasswordManagerWrapper::loadPasswordsWrapped),
          PasswordManagerWrapper::InstanceMethod("exportToString", &PasswordManagerWrapper::exportToStringWrapped),
      });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Napi::String name = Napi::String::New(env, "PasswordManager");
  exports.Set(name, PasswordManagerWrapper::GetClass(env));
  return exports;
}

NODE_API_MODULE(addon, Init)