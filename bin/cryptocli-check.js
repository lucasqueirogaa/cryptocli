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

program.parse(process.argv);
