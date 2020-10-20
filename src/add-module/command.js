const path = require("path");
const fs = require("fs-extra");
const { cwd } = require("process");
const { validateProjectIntegrity } = require("./project-integrity");
const { FOLDER_NOT_FOUND, WRONG_FOLDER_PATH } = require('../constants');
const { saveInDb } = require("../db/db-management");

exports.command = 'add <folderName>';

exports.describe = 'add a new project';

/**
 * @param  {import("yargs")} yargs
 */
exports.builder = (yargs) => {
  yargs.check(async ({folderName}) => {
    if (!folderName) throw new Error(WRONG_FOLDER_PATH);
    const folderPath = path.resolve(cwd(), folderName);
    if (!(await fs.pathExists(folderPath))) throw new Error(FOLDER_NOT_FOUND);
    return true;
  });
}
  

exports.handler = async ({folderName}) => {
  const projectInfo = await validateProjectIntegrity(folderName);
  await saveInDb(projectInfo);
}