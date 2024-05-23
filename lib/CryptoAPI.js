const axios = require("axios");
const colors = require("colors");

class CryptoAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
  }

  async getPriceData(coinOptions, currencyOptions) {
    try {
      const res = await axios.get(
        `${this.baseURL}${coinOptions}&tsyms=${currencyOptions}&api_key=${this.apiKey}`
      );

      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CryptoAPI;
