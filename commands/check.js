const KeyManager = require("../lib/KeyManager");
const inquirer = require("inquirer");
const CryptoAPI = require("../lib/CryptoAPI");
const { priceFormatter } = require("../utils/priceFormatter");
const { isRequired } = require("../utils/validation");

const check = {
  async price(cmd) {
    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey("apiKey");

      const api = new CryptoAPI(key);

      const coinPrices = await api.getPriceData(cmd.coin, cmd.cur);

      const coinsKeys = Object.keys(coinPrices.data);
      const coinsPrices = Object.values(coinPrices.data);

      const formatedCurrencys = [];

      for (const currency of coinsPrices) {
        const currencysNames = Object.keys(currency);
        const currencysValues = Object.values(currency);

        const allCurrencys = [];

        for (let i = 0; i < currencysNames.length; i++) {
          const currencyFormated = priceFormatter({
            curOption: currencysNames[i],
          }).format(currencysValues[i]);

          allCurrencys.push(
            `${currencysNames[i]}: ${currencyFormated.replace(",", "::")}`
          );
        }

        formatedCurrencys.push(allCurrencys);
      }

      for (let i = 0; i < coinsKeys.length; i++) {
        console.log(
          `Coin: ${coinsKeys[i].yellow} | Prices: ${
            formatedCurrencys[i].join(" - ").replace(/::/g, ",").green
          }`
        );
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
  async top(cmd) {
    let cmdCurrency = cmd.cur;

    while (!cmdCurrency) {
      const getCurrency = await inquirer.prompt({
        type: "input",
        name: "key",
        message: "This value is required, put one currency:".red,
        validate: isRequired,
      });

      cmdCurrency = getCurrency.key;
    }

    while (cmdCurrency.split(",").length > 1) {
      const getCurrency = await inquirer.prompt({
        type: "input",
        name: "key",
        message: "You can't send more to 1 currency value, send only one:".red,
        validate: isRequired,
      });

      cmdCurrency = getCurrency.key;
    }

    try {
      const keyManager = new KeyManager();
      const key = keyManager.getKey("apiKey");

      const api = new CryptoAPI(key);

      const { data } = await api.getTopCryptos(cmdCurrency);

      for (const [idx, crypto] of data.Data.entries()) {
        if (crypto) {
          const currency = cmdCurrency;
          const currentPrice = crypto["DISPLAY"]
            ? crypto["DISPLAY"][currency]["PRICE"]
            : "Not Found";
          const openPrice = crypto["DISPLAY"]
            ? crypto["DISPLAY"][currency]["OPENHOUR"]
            : "Not Found";
          const highPrice = crypto["DISPLAY"]
            ? crypto["DISPLAY"][currency]["HIGHHOUR"]
            : "Not Found";
          const lowerPrice = crypto["DISPLAY"]
            ? crypto["DISPLAY"][currency]["LOWHOUR"]
            : "Not Found";

          const objToReturn = {
            Position: (idx + 1),
            Full_Name: crypto.CoinInfo.FullName,
            Actual_Price: currentPrice,
            Open_Value_Today: openPrice,
            High_Value_Today: highPrice,
            Lower_Value_Today: lowerPrice,
          };

          console.log(`${crypto.CoinInfo.Name}:`.green, objToReturn);
        }
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
};

module.exports = check;
