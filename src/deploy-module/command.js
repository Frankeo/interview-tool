const {
  selectProjectByCriteria,
  selectProjectByName,
} = require("../db/db-management");
const { createOutputProject } = require("../services/output-project");
const { deployProjectToCodeSandbox } = require("../services/deploy");
const { topics, difficultyLevel } = require("../constants");
const { logError } = require("../services/formatting");
const Listr = require("listr");

exports.command = "deploy [-t] [-d] [-p] [noTests]";

exports.describe = "deploy a project by NAME or by TOPIC or DIFFICULTY";

/**
 * @param  {import("yargs")} yargs
 */
exports.builder = (yargs) =>
  yargs
    .option("p", {
      alias: "project",
      type: "string",
      description: "search project by name",
    })
    .option("t", {
      alias: "topic",
      choices: topics,
      description: "search by project's topic",
    })
    .option("d", {
      alias: "difficulty",
      choices: difficultyLevel,
      description: "search by project's difficulty",
    })
    .option("noTests", {
      type: "boolean",
      default: false,
      description: "With no tests export it",
    });

/**
 * @param  {deployProjectInfo}
 */
exports.handler = async ({ topic, difficulty, project, noTests }) => {
  try {
    let projectInfo;
    await new Listr([
      {
        title: "Searching project on DB",
        task: async () => {
          projectInfo = project
            ? await selectProjectByName(project)
            : await selectProjectByCriteria(topic, difficulty);
          if (!projectInfo) throw new Error("project not found");
        },
      },
      {
        title: "Formatting project for deploy",
        task: async () => {
          await createOutputProject(projectInfo, noTests);
        },
      },
    ]).run();
    // TODO: Remove output folder after deploy.
    deployProjectToCodeSandbox();
  } catch (e) {
    logError(e.message);
  }
};
