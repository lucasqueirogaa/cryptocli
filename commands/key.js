const inquirer = require("inquirer");
const colors = require("colors");
const KeyManager = require("../lib/KeyManager");
const { isRequired } = require("../utils/validation");

const key = {
  async set() {
    const keyManager = new KeyManager();
    const input = await inquirer.prompt({
      type: "input",
      name: "key",
      message: "Enter Your Api Key".green + "https://cryptocompare.com",
      validate: isRequired,
    });

    const key = keyManager.setKey(input.key, "apiKey");

    if (key) {
      console.log("Api Key Set".blue);
    }
  },
  show() {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey("apiKey");

      console.log(`Current Api Key: ${key.yellow}`);

      return key;
    } catch (error) {
      console.log(error.message.red);
    }
  },
  remove() {
    try {
      const keyManager = new KeyManager();
      keyManager.deleteKey("apiKey");

      console.log("Key removed".blue);

      return;
    } catch (error) {
      console.log(error.message.red);
    }
  },
};

module.exports = key;
