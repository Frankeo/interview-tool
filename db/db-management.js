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

const saveInDb = (projectFiles) => {
  const { indexFile, testFile, exerciseFile, projectName } = projectFiles;
  db.run(
    "CREATE TABLE IF NOT EXISTS challenges (name TEXT, srcContent TEXT, testContent TEXT, instructionsContent Text)",
    () =>
      db.run(
        "INSERT INTO challenges(name, srcContent, testContent, instructionsContent) VALUES(?, ?, ?, ?)",
        [projectName, indexFile, testFile, exerciseFile]
      )
  );
};

/**
 * @param  {string} projectName
 */
const selectByName = (projectName) => new Promise(resolve => {
    const query = `SELECT * FROM challenges WHERE name = ?`;
    db.get(query, [projectName], (_err, row) => resolve(row));
  });

const getProjectFromDb = params => {
  const { projectName } = params;
  if (projectName) return selectByName(projectName);
};

module.exports = {
  connectToDb,
  saveInDb,
  getProjectFromDb,
};
