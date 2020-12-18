// FOLDERS
const OUTPUT_FOLDER = "output";
const INPUT_FOLDER = "input";

// ERROR MESSAGES
const FOLDER_NOT_FOUND = "the folder doesn't exit";
const WRONG_DIFFICULTY_LEVEL = "wrong difficulty level";
const WRONG_TOPIC = "wrong topic";
const PACKAGE_JSON_NOT_FOUND = "package.json not found";
const CATEGORIZATION_ERROR = "problem with project categorization";
const SRC_NOT_FOUND_ERROR = "src file not found";

// FILES
const SRC_FILE = "src/index.js";
const TEST_FILE = "tests/index.test.js";
const PACKAGE_JSON_FILE = "package.json";
const EXERCISE_FILE = "Exercise.md";

// DIFFICULTY LEVELS
const EASY = "easy";
const NORMAL = "normal";
const HARD = "hard";
const CRAZY = "crazy";

// TOPICS
const NUMBERS = "numbers";
const STRINGS = "strings";
const DATA_TYPES = "data-types";
const ARRAYS = "arrays";

// Program Mode
const ProgramMode = {
  ADD: "add",
  SELECT: "select",
};

const difficultyLevel = [EASY, NORMAL, HARD, CRAZY];

const topics = [NUMBERS, STRINGS, DATA_TYPES, ARRAYS];

module.exports = {
  WRONG_TOPIC,
  OUTPUT_FOLDER,
  FOLDER_NOT_FOUND,
  WRONG_DIFFICULTY_LEVEL,
  SRC_FILE,
  TEST_FILE,
  PACKAGE_JSON_FILE,
  EXERCISE_FILE,
  EASY,
  NORMAL,
  HARD,
  CRAZY,
  NUMBERS,
  STRINGS,
  DATA_TYPES,
  ARRAYS,
  INPUT_FOLDER,
  PACKAGE_JSON_NOT_FOUND,
  CATEGORIZATION_ERROR,
  SRC_NOT_FOUND_ERROR,
  ProgramMode,
  difficultyLevel,
  topics,
};
