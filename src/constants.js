// TOOL PARAMS
const WITH_TEST_PARAM = "--with-tests";
const PROJECT_PARAM = "-p";
const DIFFICULTY_PARAM = "-d";
const TOPIC_PARAM = "-t";
const SELECT_PARAM = "select";
const ADD_PARAM = "add";

// FOLDERS
const OUTPUT_FOLDER = "output";
const INPUT_FOLDER = "input";
const NODE_MODULES = "node_modules";

// ERROR MESSAGES
const FOLDER_NOT_FOUND = "the folder doesn't exit";
const MISSING_PROJECT_NAME = "missing project name";
const WRONG_SELECTION_PARAM = "wrong selection parameter";
const WRONG_DIFFICULTY_LEVEL = "wrong difficulty level";
const WRONG_TOPIC = "wrong topic";
const WRONG_MODE = "wrong mode parameter";
const WRONG_FOLDER_PATH = "wrong folder path";
const TOO_MUCH_PARAMS = "more parameters that is need it";
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
  ADD : "add",
  SELECT : "select",
};

const difficultyLevel = [ EASY, NORMAL, HARD, CRAZY ];

const topics = [ NUMBERS, STRINGS, DATA_TYPES, ARRAYS ];

module.exports = {
  WITH_TEST_PARAM,
  WRONG_TOPIC,
  PROJECT_PARAM,
  DIFFICULTY_PARAM,
  TOPIC_PARAM,
  SELECT_PARAM,
  ADD_PARAM,
  OUTPUT_FOLDER,
  NODE_MODULES,
  FOLDER_NOT_FOUND,
  MISSING_PROJECT_NAME,
  WRONG_SELECTION_PARAM,
  WRONG_DIFFICULTY_LEVEL,
  WRONG_MODE,
  WRONG_FOLDER_PATH,
  TOO_MUCH_PARAMS,
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
