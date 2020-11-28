const fs = require("fs-extra");
const findUp = require("find-up");
const path = require("path");
const {
  OUTPUT_FOLDER,
  INPUT_FOLDER,
  TEST_FILE,
  EXERCISE_FILE,
  PACKAGE_JSON_FILE,
} = require("../constants");
const {cwd} = require("process");

/**
 * @param  {outputProjectInfo}
 * @param  {boolean} hasTests
 */
const createOutputProject =
    async ({testContent, instructionsContent}, hasTests) => {
  const outputFolderPath = await createOutputFolder(false);
  if (hasTests)
    await fs.writeFile(`${outputFolderPath}/${TEST_FILE}`, testContent);

  await fs.writeFile(`${outputFolderPath}/${EXERCISE_FILE}`,
                     instructionsContent);
};

/**
 * @param  {boolean} hasOutputInExecPath
 * @param {string} projectName
 * @returns {string}
 */
const createOutputFolder = async (hasOutputInExecPath, projectName) => {
  const mainDirectoryPath = path.resolve(
      await findUp(INPUT_FOLDER, {type : "directory", cwd : __dirname}), "..");
  const inputDirectoryPath = path.resolve(mainDirectoryPath, INPUT_FOLDER);
  const outputDirectoryPath =
      path.resolve(hasOutputInExecPath ? cwd() : mainDirectoryPath,
                   projectName || OUTPUT_FOLDER);
  await fs.remove(outputDirectoryPath);
  await fs.copy(inputDirectoryPath, outputDirectoryPath);
  return outputDirectoryPath;
};
/**
 * @param  {string} outputDirectoryPath
 * @param  {string} topic
 * @param  {string} difficulty
 * @param  {string} projectName
 */
const addProjectConfig =
    async (outputDirectoryPath, topic, difficulty, projectName) => {
  const jsonContent =
      await fs.readJSON(`${outputDirectoryPath}/${PACKAGE_JSON_FILE}`);
  jsonContent.keywords[0] = difficulty;
  jsonContent.keywords[1] = topic;
  jsonContent.name = projectName;
  await fs.writeJSON(`${outputDirectoryPath}/${PACKAGE_JSON_FILE}`,
                     jsonContent);
};

module.exports = {
  createOutputProject,
  createOutputFolder,
  addProjectConfig,
};
