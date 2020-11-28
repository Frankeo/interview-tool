const cliff = require("cliff");
const signale = require('signale');
const chalk = require('chalk');

const logInfo = (text) => signale.info(chalk.bold(text));
const logError = (text) => signale.fatal(text);
const logComplete = (text, declaration) => signale.complete({prefix: ' ', message: chalk.bold(text), suffix: chalk.grey(`(${declaration})`) });

/* @TODO: Avoid custom table formatting
 * @BODY: Instead of this custom logic try with:
 * [console-table-printer](https://github.com/ayonious/console-table-printer) OR
 * [cli-table3](https://github.com/cli-table/cli-table3) OR
 * [Native node console](https://nodejs.org/api/console.html#console_console_table_tabulardata_properties)
 */
const logResultTable = (list) => {
  list.forEach((row) => {
    for (const elem in row) {
      if (row.hasOwnProperty(elem)) {
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
