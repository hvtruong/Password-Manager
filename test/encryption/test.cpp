#include "../../encryption/passwordManager.h"
#include <iostream>

using namespace std;

int main() {

    PasswordManager passwordManager = PasswordManager("2421");

    passwordManager.insertPassword("123456");
    vector<string> ecryptedpasswords = passwordManager.retrievePasswords();
    for (int i = 0; i < ecryptedpasswords.size(); i++) {
        cout << ecryptedpasswords[i] << endl;
    }

    string decryptedPasswords = passwordManager.decryptPassword(ecryptedpasswords[0]);

    cout << decryptedPasswords << endl;

    return 0;
}