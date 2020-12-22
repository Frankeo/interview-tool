const { getAllChallenges } = require("../db/db-management");
const { logInfo, logTable, logError } = require("../services/formatting");
const { NOT_PROJECT_MESSAGE } = require("../constants");

exports.command = "list";

exports.describe = "list all projects";

exports.handler = async () => {
  try {
    const projects = await getAllChallenges();
    if (!projects) {
      logInfo(NOT_PROJECT_MESSAGE);
      return;
    }
    logInfo("Interview challenges");
    logTable(projects);
  } catch (e) {
    logError(e.message);
  }
};
