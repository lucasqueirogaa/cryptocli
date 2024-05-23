const priceFormatter = (input) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: input.curOption,
  });

module.exports = { priceFormatter };
