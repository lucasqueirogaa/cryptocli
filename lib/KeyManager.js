const Configstore = require("configstore");
const pkg = require("../package.json");

class KeyManager {
  constructor() {
    this.conf = new Configstore(pkg.name);
  }

  setKey(key, keyName) {
    this.conf.set(keyName, key);
    return key;
  }

  getKey(keyName) {
    const key = this.conf.get(keyName);

    if (!key) {
      throw new Error("No API Key Found -- Get at https://cryptocompare.com");
    }

    return key;
  }

  deleteKey(keyName) {
    const key = this.conf.get(keyName);

    if (!key) {
      throw new Error("No API Key Found -- Get at https://cryptocompare.com");
    }

    this.conf.delete("apiKey");

    return;
  }
}

module.exports = KeyManager;
