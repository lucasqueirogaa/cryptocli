const { Command } = require("commander");
const program = new Command();
const key = require("../commands/key");

program
  .command("set")
  .description("Set API Key -- Get at https://cryptocompare.com")
  .action(key.set);

program.command("show").description("Show API key").action(key.show);

program.command("remove").description("Remove API Key").action(key.remove);

program.parse(process.argv);
