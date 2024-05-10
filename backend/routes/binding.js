const addon = require('../build/Release/encryption.node');

function PasswordManager(key) {
    var _addonInstance = new addon.PasswordManager(key);
    
    this.generateNewPassword = function(str) {
        return _addonInstance.generateNewPassword(str);
    }

    this.insertSite = function(str) {
        return _addonInstance.insertSite(str);
    }

    this.insertPassword = function(str) {
        return _addonInstance.insertPassword(str);
    }

    this.exportToString = function(str) {
        return _addonInstance.exportToString(str);
    }
}

module.exports = PasswordManager;