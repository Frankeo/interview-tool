const {
  validateProjectIntegrity,
  hasFiles,
  getDirectories,
} = require("./project-integrity");
const { saveInDb, existProjectBy } = require("../db/db-management");
const { logComplete, logError } = require("../services/formatting");

exports.command = "add <directoryName>";

exports.describe = "add a new project";

/**
 * @param  {import("yargs")} yargs
 */
exports.builder = (yargs) => {
  yargs.positional("directoryName", {
    type: "string",
    description: "project's directory name or base directory",
  });
};

const commonHandlerLogic = async (directoryName) => {
  const projectInfo = await validateProjectIntegrity(directoryName);
  const projectExists = await existProjectBy(projectInfo);
  if (projectExists) throw new Error("Duplicated project");
  await saveInDb(projectInfo);
  logComplete(projectInfo.projectName, "in the collection");
};

/**
 * @param  {{directoryName: string}}
 */
exports.handler = async ({ directoryName }) => {
  try {
    const projects = hasFiles(directoryName)
      ? [directoryName]
      : getDirectories(directoryName);
    for (const project of projects) {
      await commonHandlerLogic(project);
    }
  } catch (e) {
    logError(e.message);
  }
};
