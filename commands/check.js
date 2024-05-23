const KeyManager = require("../lib/KeyManager");
const CryptoAPI = require("../lib/CryptoAPI");
const { priceFormatter } = require("../utils/priceFormatter");

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
            formatedCurrencys[i]
              .join(" - ")
              .replace(/::/g, ",").green
          }`
        );
      }
    } catch (error) {
      console.log(error.message.red);
    }
  },
};

module.exports = check;
