const fs = require("fs-extra");
const {
    difficultyLevel,
    topics,
    PACKAGE_JSON_NOT_FOUND,
    CATEGORIZATION_ERROR,
    WRONG_DIFFICULTY_LEVEL,
    WRONG_TOPIC,
    PACKAGE_JSON_FILE,
    SRC_FILE,
    TEST_FILE,
    EXERCISE_FILE,
    SRC_NOT_FOUND_ERROR
} = require("./constants");
const { FOLDER_NOT_FOUND } = require('./constants');
const path = require("path");
const { cwd } = require("process");

const validateProjectIntegrity = async (projectFolder) => {
    await checkFolderExists(projectFolder);
    await validateProjectDifficultyAndTopic(projectFolder);
    return getProjectInfo(projectFolder);
}

/**
 * @param  {string} folderName
 */
const checkFolderExists = async (folderName) => {
  const folderPath = path.resolve(cwd(), folderName);
  if (!(await fs.pathExists(folderPath))) throw new Error(FOLDER_NOT_FOUND);
};

/**
 * @param  {string} folderName
 */
const getProjectInfo = async (folderName) => {
  const indexFile = await getFile(folderName, SRC_FILE, SRC_NOT_FOUND_ERROR);
  const testFile = await getFile(folderName, TEST_FILE, "error2");
  const exerciseFile = await getFile(folderName, EXERCISE_FILE, "error3");
  const projectName = folderName.replace('/', '');
  return {
    indexFile,
    testFile,
    exerciseFile,
    projectName
  }
}

const getFile = async (folderName, fileName, error) => {
  const filePath = path.resolve(cwd(), folderName, fileName);
  if(!(await fs.pathExists(filePath))) throw new Error(error);
  return fs.readFile(filePath);
}

/**
 * @param  {string} folderName
 */
const validateProjectDifficultyAndTopic = async (folderName) => {
  const packagePath = path.resolve(cwd(), folderName, PACKAGE_JSON_FILE);
  if(!(await fs.pathExists(packagePath))) throw new Error(PACKAGE_JSON_NOT_FOUND);

  const { keywords } = await fs.readJSON(packagePath);

  if (!Array.isArray(keywords) || keywords.length != 2)
    throw new Error(CATEGORIZATION_ERROR);

  if (!difficultyLevel.includes(keywords[0]))
    throw new Error(WRONG_DIFFICULTY_LEVEL);

  if (!topics.includes(keywords[1]))
    throw new Error(WRONG_TOPIC);
};

module.exports = {
    validateProjectIntegrity
}
