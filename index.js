#!/usr/bin/env node
const {connectToDb} = require("./src/db/db-management");
const {logError} = require("./src/services/formatting");

const main = () => {
  try {
    connectToDb();
    require("yargs")
        .command(require("./src/add-module/command"))
        .command(require("./src/deploy-module/command"))
        .command(require("./src/list-module/command"))
        .command(require("./src/create-module/command"))
        .demandCommand(1)
        .help("h")
        .alias("help", "h")
        .version()
        .alias("v", "version")
        .strict()
        .completion()
        .argv;
  } catch (err) {
    logError(err);
  }
};

main();
