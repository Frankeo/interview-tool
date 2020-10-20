const { selectProjectByCriteria, selectProjectByName } = require('../db/db-management');
const { createOutputProject } = require('../services/output-project');
const { deployProjectToCodeSandbox } = require('../services/deploy');
const { topics, difficultyLevel } = require('../constants');

exports.command = "deploy [-t] [-d] [-p]";

exports.describe = "deploy a project by NAME or by TOPIC or DIFFICULTY";

/**
 * @param  {import("yargs")} yargs
 */
exports.builder = (yargs) =>
  yargs
    .option("p", {
      alias: "project",
      type: 'string',
      description: "search project by name"
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
 * @param  {string} topic
 * @param  {string} difficulty
 * @param  {string} project
 * @param  {boolean} noTests
 */
exports.handler = async ({ topic, difficulty, project, noTests }) => {
  let projectInfo;
  if (project) 
    projectInfo = await selectProjectByName(project);
  else 
    projectInfo = await selectProjectByCriteria(topic, difficulty);
  await createOutputProject(projectInfo, noTests);
  deployProjectToCodeSandbox();
};
