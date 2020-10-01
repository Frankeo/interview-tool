const { spawn } = require("child_process");
const { validateProjectIntegrity } = require("./project-integrity");
const { createOutputProject } = require("./output-project");
const { saveInDb, getProjectFromDb } = require("./db/db-management");

const addMode = async (params) => {
  const projectInfo = await validateProjectIntegrity(params);
  await saveInDb(projectInfo);
};

const selectMode = async (params) => {
  const projectInfo = await getProjectFromDb(params);
  await createOutputProject(projectInfo, params.withTests);
  deployProject();
};

const deployProject = () => {
  spawn("npm", ["run", "ship"], {
    cwd: __dirname,
    stdio: "inherit",
  });
};

module.exports = {
  addMode,
  selectMode,
};
