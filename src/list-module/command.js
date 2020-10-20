const { getAllChallenges } = require("../db/db-management");

exports.command = 'list';

exports.describe = 'list all projects';

exports.builder = (_yargs) => {}
  
exports.handler = async () => {
  const projects = await getAllChallenges();
  console.log(projects);
}