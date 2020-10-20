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
} = require("../constants");
const path = require("path");
const { cwd } = require("process");

/**
 * @param  {string} projectFolder
 * @returns {projectInfo}
 */
const validateProjectIntegrity = async (projectFolder) => {
    const { topic, difficulty } = await validateProjectDifficultyAndTopic(projectFolder);
    return getProjectInfo(projectFolder, topic, difficulty);
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

  return {
    difficulty: keywords[0],
    topic: keywords[1]
  }
};

/**
 * @param  {string} folderName
 * @returns {projectInfo}
 */
const getProjectInfo = async (folderName, topic, difficulty) => {
  const indexFile = await getFile(folderName, SRC_FILE, SRC_NOT_FOUND_ERROR);
  const testFile = await getFile(folderName, TEST_FILE, "error2");
  const exerciseFile = await getFile(folderName, EXERCISE_FILE, "error3");
  const projectName = folderName.replace('/', '');
  return {
    mainFile: indexFile,
    testFile,
    exerciseFile,
    projectName,
    topic, 
    difficulty
  }
}

const getFile = async (folderName, fileName, error) => {
  const filePath = path.resolve(cwd(), folderName, fileName);
  if(!(await fs.pathExists(filePath))) throw new Error(error);
  return fs.readFile(filePath);
}

module.exports = {
    validateProjectIntegrity
}
