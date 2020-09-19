#!/usr/bin/env node

const fs = require("fs-extra");
const { argv } = require("process");
const { spawn } = require("child_process");

// ACCEPTED PARAMS
const WITH_TEST_PARAM = "--with-tests";
const PROJECT_PARAM = "-p";

// FOLDERS
const OUTPUT_FOLDER = "output";
const NODE_MODULES = "node_modules";

// ERROR MESSAGES
const MISSING_PROJECT_NAME = "missing project name";
const FOLDER_NOT_FOUND = "the folder doesn't exit";

// FILES
const SRC_FILE = "index.js";
const TEST_FILE = "index.test.js";


const main = async () => {
    sanitizeInput();
    await createOutputProject();
    deployProject();
};

const sanitizeInput = () => {
  if (argv[2] != PROJECT_PARAM || argv[3] == WITH_TEST_PARAM || !argv[3]) {
    console.log(MISSING_PROJECT_NAME);
    return;
  }
};

async function createOutputProject() {
  const folderName = argv[3];

  await checkFolderExists(folderName);
  await fs.remove(OUTPUT_FOLDER);
  await fs.copy(folderName, OUTPUT_FOLDER, {
    filter: filterFiles,
  });
  await fs.ensureFile(`${OUTPUT_FOLDER}/src/${SRC_FILE}`);
  await fs.ensureFile(`${OUTPUT_FOLDER}/tests/${TEST_FILE}`);
}

const checkFolderExists = async (folderName) => {
  if (!(await fs.pathExists(folderName))) {
    console.log(FOLDER_NOT_FOUND);
    return;
  }
};

const filterFiles = (path) => {
  const isWithTests = argv[4] == WITH_TEST_PARAM;
  const filterTests = isWithTests || !path.includes(TEST_FILE);
  return (
    !path.includes(NODE_MODULES) && !path.includes(SRC_FILE) && filterTests
  );
};

const deployProject = () => {
    spawn("npm", ["run", "ship"], {
        stdio: 'inherit' 
    });
}

main();
