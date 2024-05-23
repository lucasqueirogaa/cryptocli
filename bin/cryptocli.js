#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const pkg = require("../package.json");

program.version(pkg.version);

program.command("key", "Manage API Key -- Get at https://cryptocompare.com");

program.command("check", "Check Coin Price Info");

program.parse(process.argv);
