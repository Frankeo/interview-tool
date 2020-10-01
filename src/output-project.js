const fs = require("fs-extra");
const path = require("path");
const {
    OUTPUT_FOLDER,
    INPUT_FOLDER,
    SRC_FILE,
    TEST_FILE,
    EXERCISE_FILE
  } = require("./constants");

const createOutputProject = async (projectInfo, mustHaveTest) => {
  const { testContent, instructionsContent } = projectInfo;
  const outputFolder = await createOutputFolder();
  await fs.ensureFile(`${outputFolder}/${SRC_FILE}`);
  await fs.ensureFile(`${outputFolder}/${TEST_FILE}`);

  if (mustHaveTest) 
    await fs.writeFile(`${outputFolder}/${TEST_FILE}`, testContent);

  await createAndWriteFile(`${outputFolder}/${EXERCISE_FILE}`, instructionsContent);
};

const createOutputFolder = async () => {
  const outputFolder = path.resolve(__dirname, OUTPUT_FOLDER);
  const inputFolder = path.resolve(__dirname, INPUT_FOLDER);
  await fs.remove(outputFolder); 
  await fs.copy(inputFolder, outputFolder);
  return outputFolder;
}

const createAndWriteFile = async (path, content) => {
    await fs.ensureFile(path);
    await fs.writeFile(path, content);
}

module.exports = {
  createOutputProject,
};
