const { Command } = require("commander");
const program = new Command();

const check = require("../commands/check");

program
  .command("price")
  .description("Check price of coins")
  .option(
    "--coin <type>",
    "Add specifc coin types in CSV format",
    "BTC,ETH,XRP"
  )
  .option("--cur <currency>", "Change the current", "USD,BRL,EUR")
  .action((cmd) => check.price(cmd));

program
  .command("top")
  .description("Get the price of top 10 cryptos by trading volume across all markets")
  .option("--cur <currency>", "Change the current (Only one)", "USD")
  .action((cmd) => check.top(cmd));

program.parse(process.argv);
