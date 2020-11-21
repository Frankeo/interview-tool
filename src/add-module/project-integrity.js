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
  SRC_NOT_FOUND_ERROR,
} = require("../constants");
const path = require("path");
const { cwd } = require("process");
const Listr = require("listr");
const execa = require("execa");
const { FOLDER_NOT_FOUND } = require('../constants');

/**
 * @param  {string} projectFolder
 * @returns {Promise<projectInfo>}
 */
const validateProjectIntegrity = async (projectFolder) => {
  let projectSpecs;
  let projectPath;
  await new Listr([
    {
      title: "Validate directory path",
      task: async () => {
        projectPath = path.resolve(cwd(), projectFolder);
        if (!(await fs.pathExists(projectPath))) throw new Error(FOLDER_NOT_FOUND);
      }
    },
    {
      title: "Validate project Difficulty and Topic",
      task: async () =>
        (projectSpecs = await validateProjectDifficultyAndTopic(projectPath)),
    },
    {
      title: "Testing project",
      task: () => runTestsOverProject(projectPath),
    },
  ]).run();
  return getProjectInfo(
    projectPath,
    projectSpecs.topic,
    projectSpecs.difficulty
  );
};

/**
 * @param  {string} projectPath
 */
const runTestsOverProject = (projectPath) =>
  new Listr([
    {
      title: "Install project dependencies",
      task: async () =>
        await execa("npm", ["install"], {
          cwd: projectPath,
        }),
    },
    {
      title: "Running project tests",
      task: async () =>
        await execa("npm", ["test"], {
          cwd: projectPath,
        }),
    },
  ]);

/**
 * @param  {string} projectPath
 */
const validateProjectDifficultyAndTopic = async (projectPath) => {
  const packagePath = path.resolve(projectPath, PACKAGE_JSON_FILE);
  if (!(await fs.pathExists(packagePath)))
    throw new Error(PACKAGE_JSON_NOT_FOUND);

  const { keywords } = await fs.readJSON(packagePath);

  if (!Array.isArray(keywords) || keywords.length != 2)
    throw new Error(CATEGORIZATION_ERROR);

  if (!difficultyLevel.includes(keywords[0]))
    throw new Error(WRONG_DIFFICULTY_LEVEL);

  if (!topics.includes(keywords[1])) throw new Error(WRONG_TOPIC);

  return {
    difficulty: keywords[0],
    topic: keywords[1],
  };
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
    difficulty,
  };
};

/**
 * @param  {string} projectPath
 * @param  {string} fileName
 * @param  {string} error
 * @returns {Promise<Buffer>}
 */
const getFile = async (projectPath, fileName, error) => {
  const filePath = path.resolve(projectPath, fileName);
  if (!(await fs.pathExists(filePath))) throw new Error(error);
  return fs.readFile(filePath);
};

module.exports = {
  getFile,
  getProjectInfo,
  validateProjectIntegrity,
  validateProjectDifficultyAndTopic,
  runTestsOverProject,
};
