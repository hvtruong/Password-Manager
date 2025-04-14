#include "../AES/encryption.hpp"
#include <napi.h>

#ifndef ENCRYPTION
#define ENCRYPTION
using namespace std;

class Encryption : public Napi::ObjectWrap<Encryption> {
    public:
        Napi::Buffer<unsigned char> encryptAES256GCMWrapper(const Napi::CallbackInfo&);
        Napi::String decryptAES256GCMWrapper(const Napi::CallbackInfo&);
};

#endif