const cliff = require("cliff");
const signale = require("signale");
const chalk = require("chalk");

const logInfo = (text) => signale.info(chalk.bold(text));
const logError = (text) => signale.fatal(text);
const logComplete = (text, declaration) =>
  signale.complete({
    prefix: " ",
    message: chalk.bold(text),
    suffix: chalk.grey(`(${declaration})`),
  });
const logResultTable = (list) => {
  list.forEach((row) => {
    for (const elem in row) {
      if (Object.prototype.hasOwnProperty.call(row, elem)) {
        row[elem] += "    ";
      }
    }
  });
  console.log(
    cliff.stringifyObjectRows(
      list,
      ["name", "topic", "difficulty"],
      ["yellow", "cyan", "cyan"]
    )
  );
};

module.exports = {
  logInfo,
  logError,
  logComplete,
  logResultTable,
};
