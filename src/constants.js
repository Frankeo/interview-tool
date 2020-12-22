// FOLDERS
const OUTPUT_FOLDER = "output";
const INPUT_FOLDER = "input";

// MESSAGES
const FOLDER_NOT_FOUND = "the folder doesn't exit";
const WRONG_DIFFICULTY_LEVEL = "wrong difficulty level";
const WRONG_TOPIC = "wrong topic";
const DUPLICATED_PROJECT = "Duplicated project";
const PACKAGE_JSON_NOT_FOUND = "package.json not found";
const CATEGORIZATION_ERROR = "problem with project categorization";
const SRC_NOT_FOUND_ERROR = "src file not found";
const TEST_NOT_FOUND_ERROR = "test file not found";
const EXERCISE_NOT_FOUND_ERROR = "exercise file not found";
const PROJECT_NOT_FOUND_ERROR = "project not found";
const NOT_PROJECT_MESSAGE = "Not project to show, please add one";

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

const difficultyLevel = [EASY, NORMAL, HARD, CRAZY];

const topics = [NUMBERS, STRINGS, DATA_TYPES, ARRAYS];

module.exports = {
  WRONG_TOPIC,
  OUTPUT_FOLDER,
  DUPLICATED_PROJECT,
  EXERCISE_NOT_FOUND_ERROR,
  FOLDER_NOT_FOUND,
  WRONG_DIFFICULTY_LEVEL,
  TEST_NOT_FOUND_ERROR,
  PROJECT_NOT_FOUND_ERROR,
  SRC_FILE,
  TEST_FILE,
  PACKAGE_JSON_FILE,
  EXERCISE_FILE,
  INPUT_FOLDER,
  PACKAGE_JSON_NOT_FOUND,
  CATEGORIZATION_ERROR,
  SRC_NOT_FOUND_ERROR,
  NOT_PROJECT_MESSAGE,
  difficultyLevel,
  topics,
};
