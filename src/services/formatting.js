const signale = require("signale");
const chalk = require("chalk");
const consolePrinter = require("console-table-printer");

const logInfo = (text) => signale.info(chalk.bold(text));
const logError = (text) => signale.fatal(text);
const logComplete = (text, declaration) =>
  signale.complete({
    prefix: " ",
    message: chalk.bold(text),
    suffix: chalk.grey(`(${declaration})`),
  });

const logTable = (list) => {
  const table = new consolePrinter.Table();
  console.log(table);
  table.addRows(list);
  table.printTable();
};

module.exports = {
  logInfo,
  logError,
  logComplete,
  logTable,
};
