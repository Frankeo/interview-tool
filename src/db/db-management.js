const sqlite3 = require("sqlite3").verbose();
const path = require("path");

/**
 * @type { import("sqlite3").Database }
 */
let db;
const connectToDb = () => {
  const dbPath = path.resolve(__dirname, "exercise.db");
  db = new sqlite3.Database(dbPath, (err) => {
    if (!err) return;
    db.close();
    throw err;
  });
};

/**
 * @param  {projectInfo}
 */
const saveInDb = ({
  mainFile,
  testFile,
  exerciseFile,
  projectName,
  topic,
  difficulty
}) => {
  const createTableStatement =
    "CREATE TABLE IF NOT EXISTS challenges " +
    "(name TEXT, " +
    "srcContent TEXT, " +
    "testContent TEXT, " +
    "instructionsContent TEXT," +
    "topic TEXT, " +
    "difficulty TEXT)";
  const insertTableStatement =
    "INSERT INTO challenges" +
    "(name, srcContent, testContent, instructionsContent, topic, difficulty) " +
    "VALUES(?, ?, ?, ?, ?, ?)";
  db.run(createTableStatement, () =>
    db.run(insertTableStatement, [
      projectName,
      mainFile,
      testFile,
      exerciseFile,
      topic,
      difficulty,
    ])
  );
};

/**
 * @param  {string} projectName
 * @returns {Promise<outputProjectInfo?>}
 */
const selectProjectByName = (projectName) =>
  new Promise((resolve) => {
    const query = `SELECT testContent, instructionsContent FROM challenges WHERE name = ?`;
    db.get(query, [projectName], (_err, row) => resolve(row));
  });

/**
 * @param  {string} topic
 * @param  {string} difficulty
 * @returns {Promise<outputProjectInfo?>}
 */
const selectProjectByCriteria = (topic, difficulty) =>
  new Promise((resolve) => {
    const query = `SELECT testContent, instructionsContent FROM challenges WHERE (?1 IS NULL OR topic=?1) AND (?2 IS NULL OR difficulty=?2)`;
    db.all(query, [topic, difficulty], (_err, rows) => {
      const row = rows[Math.floor(Math.random() * rows.length)];
      resolve(row);
    });
  });

const getAllChallenges = () =>
  new Promise((resolve) => {
    const query = `SELECT name, topic, difficulty FROM challenges`;
    db.all(query, (_err, rows) => resolve(rows));
  });

module.exports = {
  connectToDb,
  saveInDb,
  selectProjectByName,
  selectProjectByCriteria,
  getAllChallenges,
};
