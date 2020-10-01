const { checkInputSanitization } = require("./sanitize-input");
const {
  SELECT_PARAM,
  PROJECT_PARAM,
  WRONG_MODE,
  WRONG_FOLDER_PATH,
  TOO_MUCH_PARAMS,
  DIFFICULTY_PARAM,
  EASY,
  NORMAL,
  HARD,
  CRAZY,
  WRONG_SELECTION_PARAM,
  ADD_PARAM,
  MISSING_PROJECT_NAME,
  WRONG_DIFFICULTY_LEVEL,
  WRONG_TOPIC,
  NUMBERS,
  STRINGS,
  DATA_TYPES,
  ARRAYS,
  TOPIC_PARAM,
  ProgramMode
} = require("./constants");

describe('general errors', () => {
  test('should receive WRONG_MODE when no parameter is entered', () => {
    const params = ["", ""];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_MODE);
  });
});

describe("selecting projects", () => {
  test('should log "WRONG_SELECTION_PARAM" when param in selection is not valid', () => {
    const params = ["", "", SELECT_PARAM, "wrong_param"];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_SELECTION_PARAM);
  });

  test('should accept as second parameter "-p" and "project name" as third', () => {
    const inputs = ["", "", SELECT_PARAM, PROJECT_PARAM, "RandomName"];
    const result = checkInputSanitization(inputs);
    expect(result.type).toBe(ProgramMode.SELECT);
    expect(result.params.projectName).toBe(inputs[inputs.length-1]);
  });

  test('should NOT accept as second parameter "-p" and "" as third', () => {
    const params = ["", "", SELECT_PARAM, PROJECT_PARAM, ""];
    expect(() => checkInputSanitization(params)).toThrowError(MISSING_PROJECT_NAME);
  });

  test.each([[EASY], [NORMAL], [HARD], [CRAZY]])(
    'should accept as second parameter "-d" and "%s" as third',
    (difficulty) => {
      const inputs = ["", "", SELECT_PARAM, DIFFICULTY_PARAM, difficulty];
      const result = checkInputSanitization(inputs);
      expect(result.type).toBe(ProgramMode.SELECT);
      expect(result.params.difficultyLevel).toBe(difficulty);
    }
  );

  test('should NOT accept as second parameter "-d" and "PUMA_STYLE" as third', () => {
    const params = ["", "", SELECT_PARAM, DIFFICULTY_PARAM, "PUMA_STYLE"];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_DIFFICULTY_LEVEL);
  });

  test.each([
    [NUMBERS],
    [STRINGS],
    [DATA_TYPES],
    [ARRAYS]
  ])('should accept as second parameter "-t" and "%s" as third',
  (topic) => {
    const inputs = ["", "", SELECT_PARAM, TOPIC_PARAM, topic];
    const result = checkInputSanitization(inputs);
    expect(result.type).toBe(ProgramMode.SELECT);
    expect(result.params.topic).toBe(topic);
  });

  test('should NOT accept as second parameter "-t" and "ONIONS" as third', () => {
    const params = ["", "", SELECT_PARAM, TOPIC_PARAM, "ONIONS"];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_TOPIC);
  });

  test.each([
    [NUMBERS, EASY],
    [STRINGS, NORMAL]
  ])('should accept: "-t" and "%s" and then "-d" and "%s"', (topic, difficulty) => {
    const inputs = ["", "", SELECT_PARAM, TOPIC_PARAM, topic, DIFFICULTY_PARAM, difficulty];
    const result = checkInputSanitization(inputs);
    expect(result.type).toBe(ProgramMode.SELECT);
    expect(result.params.topic).toBe(topic);
    expect(result.params.difficultyLevel).toBe(difficulty);
  });

  test('should NOT accept: "-t" and "numbers" and then "-d" and "ARGENTO"', () => {
    const params = ["", "", SELECT_PARAM, TOPIC_PARAM, NUMBERS, DIFFICULTY_PARAM, "ARGENTO"];;
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_DIFFICULTY_LEVEL);
  });

  test('should NOT accept: "-d" and "easy" and then "-t" and "PEPE"', () => {
    const params = ["", "", SELECT_PARAM, DIFFICULTY_PARAM, EASY, TOPIC_PARAM, "PEPE"];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_TOPIC);
  });
});

describe("adding new projects", () => {
  test('should receive "add" as first parameter', () => {
    const params = ["", "", ADD_PARAM];
    expect(() => checkInputSanitization(params)).not.toThrowError(WRONG_MODE);
  });

  test('should receive as second parameter a "folder path"', () => {
    const inputs = ["", "", ADD_PARAM, "RandomFolderPath"];
    const result = checkInputSanitization(inputs);
    expect(result.type).toBe(ProgramMode.ADD);
    expect(result.params).toBe(inputs[inputs.length-1]);
  });

  test('should NOT accept blank as folder path', () => {
    const params = ["", "", ADD_PARAM, ""];
    expect(() => checkInputSanitization(params)).toThrowError(WRONG_FOLDER_PATH);
  });

  test('should receive only 2 parameters', () => {
    const params = ["", "", ADD_PARAM, "RandomFolder", "More params"];
    expect(() => checkInputSanitization(params)).toThrowError(TOO_MUCH_PARAMS);
  });
});
