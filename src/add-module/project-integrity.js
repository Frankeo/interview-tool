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
const { spawnSync } = require("child_process");

/**
 * @param  {string} projectFolder
 * @returns {projectInfo}
 */
const validateProjectIntegrity = async (projectFolder) => {
    const projectPath = path.resolve(cwd(), projectFolder);
    const { topic, difficulty } = await validateProjectDifficultyAndTopic(projectPath);
    runTestsOverProject(projectPath);
    return getProjectInfo(projectPath, topic, difficulty);
}


/**
 * @param  {string} projectPath
 */
const runTestsOverProject = (projectPath) => {
  const installResult = spawnSync("npm", ["install"], {
    cwd: projectPath,
    stdio: "inherit",
  });

  if (installResult.status) throw Error("ERROR");

  const testResult = spawnSync("npm", ["test"], {
    cwd: projectPath,
    stdio: "inherit"
  });

  if (testResult.status) throw Error("ERROR");
}

/**
 * @param  {string} projectPath
 */
const validateProjectDifficultyAndTopic = async (projectPath) => {
  const packagePath = path.resolve(projectPath, PACKAGE_JSON_FILE);
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
 * @param  {string} projectPath
 * @returns {projectInfo}
 */
const getProjectInfo = async (projectPath, topic, difficulty) => {
  const indexFile = await getFile(projectPath, SRC_FILE, SRC_NOT_FOUND_ERROR);
  const testFile = await getFile(projectPath, TEST_FILE, "error2");
  const exerciseFile = await getFile(projectPath, EXERCISE_FILE, "error3");
  const projectName = projectPath.replace(/\/$/, "").split("/").pop();
  return {
    mainFile: indexFile,
    testFile,
    exerciseFile,
    projectName,
    topic, 
    difficulty
  }
}

const getFile = async (projectPath, fileName, error) => {
  const filePath = path.resolve(projectPath, fileName);
  if(!(await fs.pathExists(filePath))) throw new Error(error);
  return fs.readFile(filePath);
}

module.exports = {
    validateProjectIntegrity,
    runTestsOverProject
}
