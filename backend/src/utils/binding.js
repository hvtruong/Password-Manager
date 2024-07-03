const addon = require('../../build/Release/encryption.node');

// The binding process contains methods from C++ addon to NodeJs
function PasswordManager(key) {
    var _addonInstance = new addon.PasswordManager(key);
    
    this.generateNewPassword = function(str) {
        return _addonInstance.generateNewPassword(str);
    }

    this.inserNewData = function(str, str) {
        return _addonInstance.inserNewData(str, str);
    }

    this.loadDataFromFile = function(str) {
        return _addonInstance.loadPasswords(str);
    }

    this.exportToString = function(str) {
        return _addonInstance.exportToString(str);
    }
}

module.exports = PasswordManager;