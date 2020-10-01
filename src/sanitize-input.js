const {
  ProgramMode,
  PROJECT_PARAM,
  MISSING_PROJECT_NAME,
  WRONG_SELECTION_PARAM,
  WITH_TEST_PARAM,
  TOO_MUCH_PARAMS,
  WRONG_DIFFICULTY_LEVEL,
  WRONG_FOLDER_PATH,
  WRONG_MODE,
  SELECT_PARAM,
  ADD_PARAM,
  DIFFICULTY_PARAM,
  TOPIC_PARAM,
  WRONG_TOPIC,
  difficultyLevel,
  topics,
} = require("./constants");

const selectionOption = [PROJECT_PARAM, DIFFICULTY_PARAM, TOPIC_PARAM];

const checkInputSanitization = (params) => {
  if (params[2] != SELECT_PARAM && params[2] != ADD_PARAM) throw new Error(WRONG_MODE);
  if (params[2] == ADD_PARAM) return checkSanitizeAdd(params);
  if (params[2] == SELECT_PARAM) return checkSanitizeSelection(params);
};

const checkSanitizeSelection = (params) => {
  if (!selectionOption.includes(params[3])) throw new Error(WRONG_SELECTION_PARAM);
  
  if (params[3] == DIFFICULTY_PARAM) return sanitizeDifficultySelection(params);
  if (params[3] == TOPIC_PARAM) return sanitizeTopicSelection(params);

  if (params[3] == PROJECT_PARAM && !params[4]) 
    throw new Error(MISSING_PROJECT_NAME);

  return {
    type: ProgramMode.SELECT,
    params: {
      projectName: params[4],
      withTests: params[params.length-1] == WITH_TEST_PARAM
    },
  };
};

const checkSanitizeAdd = (params) => {
  if (!params[3]) throw new Error(WRONG_FOLDER_PATH);

  if (params[4]) throw new Error(TOO_MUCH_PARAMS);

  return { type: ProgramMode.ADD, params: params[3] };
};

const sanitizeDifficultySelection = (params) => {
  if (!difficultyLevel.includes(params[4])) 
    throw new Error(WRONG_DIFFICULTY_LEVEL);

  if (
    difficultyLevel.includes(params[4]) &&
    params[5] == TOPIC_PARAM &&
    !topics.includes(params[6])
  )
    throw new Error(WRONG_TOPIC);

  return {
    type: ProgramMode.SELECT,
    params: {
      difficultyLevel: params[4],
      topic: params[6],
      withTests: params[params.length-1] == WITH_TEST_PARAM
    },
  };
};

const sanitizeTopicSelection = (params) => {
  if (!topics.includes(params[4]))
    throw new Error(WRONG_TOPIC);

  if (
    topics.includes(params[4]) &&
    params[5] == DIFFICULTY_PARAM &&
    !difficultyLevel.includes(params[6])
  )
    throw new Error(WRONG_DIFFICULTY_LEVEL);

  return {
    type: ProgramMode.SELECT,
    params: {
      topic: params[4],
      difficultyLevel: params[6],
      withTests: params[params.length-1] == WITH_TEST_PARAM
    },
  };
};

module.exports = { checkInputSanitization };
