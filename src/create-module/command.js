const {createOutputFolder, addProjectConfig} =
    require('../services/output-project');
const {topics, difficultyLevel} = require('../constants');
const {logComplete, logError} = require('../services/formatting');
const Listr = require("listr");

exports.command = "create <projectName> [-t] [-d]";

exports.describe =
    "create a project in the current path, with name, topic and difficulty specified";

/**
 * @param  {import("yargs")} yargs
 */
exports.builder = (yargs) =>
    yargs
        .positional("projectName",
                    {type : 'string', description : "project Name"})
        .option("t", {
          alias : "topic",
          choices : topics,
          description : "search by project's topic",
        })
        .option("d", {
          alias : "difficulty",
          choices : difficultyLevel,
          description : "search by project's difficulty",
        });

/**
 * @param  {projectInfoSearch}
 */
exports.handler = async ({topic, difficulty, projectName}) => {
  try {
    await new Listr([
      {
        title : `Creating folders for '${projectName}'`,
        task : async (ctx) => ctx.outputFolderPath =
            await createOutputFolder(true, projectName)
      },
      {
        title : `Adding files for '${projectName}'`,
        task : async ({outputFolderPath}) => await addProjectConfig(
            outputFolderPath, topic, difficulty, projectName)
      }
    ]).run();
    logComplete(projectName, 'created in current path');
  } catch (e) {
    logError(e.message);
  }
};
