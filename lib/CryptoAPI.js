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
      handleAPIError(error);
    }
  }
}

function handleAPIError(err) {
  if (err.response.status === 401) {
    throw new Error(
      "Your API key is invalid -- Get at https://cryptocompare.com"
    );
  } else if (err.response.staus === 404) {
    ("Your API key is not responding");
  } else {
    throw new Error("Something is not working");
  }
}

module.exports = CryptoAPI;
