#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const pkg = require("../package.json");

program.version(pkg.version);

program.command("key", "Manage API Key2 -- Get at https://cryptocompare.com");

program.command("keytest", "Teste our functions 2");

program.parse(process.argv);
