#include <iostream>
#include <string>
#include "passwordManager.hpp"
#include "gtest/gtest.h"

using namespace std;

string randomKey = "randomKey123654";
PasswordManager passwordManager = PasswordManager(randomKey);
int numberOfGenerations = 1000;

TEST(randomization, generateNewPassword)
{
    vector<string> randomPasswords;

    for(int i = 0; i < numberOfGenerations; i++) {
        string randomPassword = passwordManager.generateNewPassword();

        ASSERT_TRUE(find(randomPasswords.begin(), randomPasswords.end(), randomPassword) == randomPasswords.end());

        randomPasswords.push_back(randomPassword);
    }
}

TEST(retrievals, retrieveHostSites)
{
    vector<string> randomHostsites;

    for(int i = 0; i < numberOfGenerations; i++) {
        string randomHostsite = passwordManager.generateNewPassword();
        passwordManager.insertSite(randomHostsite);

        ASSERT_TRUE(randomHostsite == passwordManager.retrieveHostSites().back());
    }
}

TEST(retrievals, retrievePasswords)
{
    vector<string> randomPasswords;
    string randomKey = passwordManager.generateNewPassword();
    passwordManager = PasswordManager(randomKey);

    for(int i = 0; i < numberOfGenerations; i++) {
        string randomPassword = passwordManager.generateNewPassword();
        passwordManager.insertPassword(randomPassword);

        ASSERT_TRUE(randomPassword != passwordManager.retrievePasswords().back());
    }
}

TEST(encryption, encrypt)
{
    Encoder encoder = Encoder(randomKey);
    for(int i = 0; i < numberOfGenerations; i++) {
        string randomPassword = passwordManager.generateNewPassword();

        ASSERT_TRUE(randomPassword != encoder.encrypt(randomPassword));
    }
}

TEST(encryption, decrypt)
{
    Encoder encoder = Encoder(randomKey);
    Decoder decoder = Decoder(randomKey);

    for(int i = 0; i < numberOfGenerations; i++) {
        string randomPassword = passwordManager.generateNewPassword();

        string encrytedPassword = encoder.encrypt(randomPassword);

        string decryptedPassword = decoder.decrypt(encrytedPassword);

        ASSERT_TRUE(randomPassword == decryptedPassword);
    }
}

TEST(files, export) {

    vector<string> randomPasswords;
    string randomKey = passwordManager.generateNewPassword();
    passwordManager = PasswordManager(randomKey);

    for(int i = 0; i < numberOfGenerations; i++) {
        string randomPassword = passwordManager.generateNewPassword();
        passwordManager.insertSite(randomPassword);
        passwordManager.insertPassword(randomPassword);

        ASSERT_TRUE(randomPassword != passwordManager.retrievePasswords().back());
    }

    passwordManager.exportToJson(".");
}

int main(int argc, char* argv[]) {

    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}