const { getAllChallenges } = require("../db/db-management");
const { logInfo, logResultTable, logError } = require("../services/formatting");

exports.command = 'list';

exports.describe = 'list all projects';
  
exports.handler = async () => {
  try {
    const projects = await getAllChallenges();
    if (!projects) {
      logInfo('Not project to show, please add one');
      return;
    }
    logInfo('Interview challenges');
    logResultTable(projects);
  } catch (error) {
    
    logError(error);
  }
}